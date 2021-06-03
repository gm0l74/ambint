//---------------------------------
// AmbInt - Admin
// File : r/[rid].js
//
// @ version             1.0
//
// @ start date          20 05 2021
// @ last update         03 06 2021
//---------------------------------

//---------------------------------
// Imports
//---------------------------------
import { useState } from 'react';
import nookies from 'nookies';
import { useRouter } from 'next/router';

import { auth } from 'lib/firebase/firebase-admin';
import { update } from 'lib/firebase/db';

import { server } from 'config/index';
import App from 'layouts/App';

// Components
import List from 'components/List';
import Settings from 'components/Settings';
import Button from 'components/Button';

//---------------------------------
// Page Room
//---------------------------------
const Room = ({ room, seats, oid }) => {
  const router = useRouter();
  const [form, setForm] = useState({ floor: '' });

  const handleChange__ = () => (e) => {
    const name = e.target.placeholder;
    const value = e.target.value;

    setForm((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const addFloor = () => {
    let floors = room.floors || [];
    floors.push(form.floor);

    update('rooms', { floors: floors }, room.uid);
    setForm({ floor: '' });
  };

  return (
    <>
      <div>
        <p className='text-center text-xl font-bold mb-2'>
          {room.displayName}
        </p>
        <p className='text-center text-lg mb-8'>
          {room.uid}
        </p>
        <div className='container mx-auto grid grid-cols-2 gap-8'>
          <div>
            <Button
              icon='arrow-circle-left'
              title='BACK'
              callback={(e) => {
                e.preventDefault();
                router.push(`/app/${oid}/r`);
              }}
            />
            <input
              type="text"
              placeholder='floor'
              className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              onChange={handleChange__()}
              value={form['floor']}
            />
            <button
              onClick={addFloor}
              className="py-2 px-4  bg-green-500 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              ADD FLOOR
            </button>
            <List
              icon='chair'
              title='Seats'
              content={seats}
              url={`/app/${oid}/s`}
            />
          </div>
          <Settings
            collection='rooms'
            uid={room.uid}
            values={{
              displayName: room.displayName,
              shortDisplayName: room.shortDisplayName,
              silence: room.silence,
              eat: room.eat,
              groupwork: room.groupwork,
            }}
            title='SAVE'
            method='UPDATE'
          />
        </div>
      </div>
    </>
  );
};

Room.layout = App;

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

    // Fetch room data
    const data_room = await fetch(`${server}/api?type=rooms&uid=${ctx.query.rid}`);
    const room = await data_room.json();

    if (!room || 'message' in room) {
      throw new Error('Unknown Room');
    }

    // Fetch seats data
    const data_seats = await fetch(`${server}/api?type=seats&user=${ctx.query.oid}&room=${ctx.query.rid}`);
    let seats = await data_seats.json();

    if (!seats || 'message' in seats) {
      seats = [];
    } else if (!Array.isArray(seats)) {
      seats = [ seats ];
    }

    return {
      props: {
        room: room,
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
export default Room;
