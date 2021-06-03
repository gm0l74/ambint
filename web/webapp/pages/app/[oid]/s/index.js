//---------------------------------
// AmbInt - Admin
// File : s/index.js
//
// @ version             1.0
//
// @ start date          20 05 2021
// @ last update         03 06 2021
//---------------------------------

//---------------------------------
// Imports
//---------------------------------
import nookies from 'nookies';
import { useRouter } from 'next/router';

import { auth } from 'lib/firebase/firebase-admin';
import { create } from 'lib/firebase/db';

import { server } from 'config/index';
import App from 'layouts/App';

// Components
import List from 'components/List';
import Settings from 'components/Settings';

import Button from 'components/Button';

//---------------------------------
// Constants
//---------------------------------
let SETTINGS_PARAMETERS = {
  displayName: '',
  state: false,
  computer: ['mac', 'win', 'linux', 'none'],
  floor: []
};

//---------------------------------
// Page Seats
//---------------------------------
const Seats = ({ rooms, seats, oid }) => {
  const router = useRouter();

  let building_uids = [];

  for (let i = 0; i < rooms.length; i++) {
    building_uids.push(rooms[i].building);
  }

  return (
    <>
      <div>
        <p className='text-center text-xl font-bold mb-8'>
          SEATS
        </p>
        <div className='container mx-auto grid grid-cols-2 gap-8'>
          <div>
            <Button
              icon='arrow-circle-left'
              title='BACK'
              callback={(e) => {
                e.preventDefault();
                router.push(`/app/${oid}`);
              }}
            />
            <List
              icon='chair'
              title='SEATS'
              content={seats}
              url={`/app/${oid}/s`}
            />
          </div>
          <Settings
            collection='seats'
            values={{
              ...SETTINGS_PARAMETERS,
              room: rooms,
              building: building_uids,
              floor: rooms.floors || []
            }}
            invisible='building'
            addon={{ user: oid, type: 'seat' }}
            title='ADD'
          />
        </div>
      </div>
    </>
  )
};

Seats.layout = App;

//---------------------------------
// GetServerSideProps
//---------------------------------
export const getServerSideProps = async (ctx) => {
  try {
    // Verify authentication
    const cookies = nookies.get(ctx);
    const token = await auth.verifyIdToken(cookies.token);

    // Confirmation that the user is authenticated!
    const { uid, email } = token;

    // Validate organization
    const org_data = await fetch(`${server}/api?type=users&uid=${ctx.query.oid}`);
    const organization = await org_data.json();

    if (!organization || 'message' in organization) {
      throw new Error('Unknown Organization');
    }

    // Fetch data
    const data = await fetch(`${server}/api?type=seats&user=${ctx.query.oid}`);
    let seats = await data.json();

    if (!seats || 'message' in seats) {
      seats = [];
    } else if (!Array.isArray(seats)) {
      seats = [ seats ];
    }

    // Fetch rooms
    const data_rooms = await fetch(`${server}/api?type=rooms&user=${ctx.query.oid}`);
    let rooms = await data_rooms.json();

    if (!rooms || 'message' in rooms) {
      rooms = [];
    } else if (!Array.isArray(rooms)) {
      rooms = [ rooms ];
    }

    return {
      props: {
        rooms: rooms,
        seats: seats,
        oid: ctx.query.oid
      }
    };
  } catch (err) {
    // Redirect to the authentication page
    return {
      redirect: {
        permanent: false,
        destination: '/'
      },
      props: {}
    };
  }
};

//---------------------------------
// Exports
//---------------------------------
export default Seats;
