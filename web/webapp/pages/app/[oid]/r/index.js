//---------------------------------
// AmbInt - Admin
// File : r/index.js
//
// @ version             1.0
//
// @ start date          20 05 2021
// @ last update         28 05 2021
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
  shortDisplayName: '',
  silence: false,
  eat: true,
  groupwork: true,
  floor: []
};

//---------------------------------
// Page Rooms
//---------------------------------
const Rooms = ({ server, rooms, oid, buildings }) => {
  const router = useRouter();

  return (
    <>
      <div>
        <p className='text-center text-xl font-bold mb-8'>
          ROOMS
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
              icon='door-open'
              title='ROOMS'
              content={rooms}
              url={`/app/${oid}/r`}
            />
          </div>
          <Settings
            collection='rooms'
            values={{
              ...SETTINGS_PARAMETERS,
              building: buildings,
              floor: buildings.floors || []
            }}
            addon={{ user: oid, type: 'room' }}
            title='ADD'
            server={server}
          />
        </div>
      </div>
    </>
  );
};

Rooms.layout = App;

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
    const data = await fetch(`${server}/api?type=rooms&user=${ctx.query.oid}`);
    let rooms = await data.json();

    if (!rooms || 'message' in rooms) {
      rooms = [];
    } else if (!Array.isArray(rooms)) {
      rooms = [ rooms ];
    }

    // Fetch buildings
    const data_buildings = await fetch(`${server}/api?type=buildings&user=${ctx.query.oid}`);
    let buildings = await data_buildings.json();

    if (!buildings || 'message' in buildings) {
      buildings = [];
    } else if (!Array.isArray(buildings)) {
      buildings = [ buildings ];
    }

    return {
      props: {
        server: server,
        buildings: buildings,
        rooms: rooms,
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
export default Rooms;
