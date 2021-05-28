//---------------------------------
// AmbInt - Admin
// File : c/[sid].js
//
// @ version             1.0
//
// @ start date          20 05 2021
// @ last update         28 05 2021
//---------------------------------

//---------------------------------
// Imports
//---------------------------------
import { server } from 'config/index';
import App from 'layouts/App';

import { toogle } from 'lib/firebase/db';

// Components
import QrCode from 'components/QrCode';

//---------------------------------
// Page Confirmation
//---------------------------------
const Confirmation = ({ sid, state }) => {
  const color = (state) ? 'red' : 'green';

  return (
    <>
      <div>
        <div className="h-full text-center">
          <div>
            <span style={{
              height: '35px',
              width: '35px',
              backgroundColor: `${color}`,
              borderRadius: '50%',
              display: 'inline-block'
            }}></span>
            <p className="text-gray-600 dark:text-gray-400 text-2xl py-2 px-6">
              What action do you want to perform?
            </p>
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                type="button"
                className="py-6 px-10  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white text-2xl transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
                onClick={(e) => {
                  e.preventDefault();
                  toogle(sid, true);
                }}
              >
                SEAT
              </button>
              <button
                type="button"
                className="py-6 px-10 bg-white hover:bg-gray-100 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-indigo-500 text-2xl text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
                onClick={(e) => {
                  e.preventDefault();
                  toogle(sid, false);
                }}
              >
                LEAVE
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Confirmation.layout = App;

//---------------------------------
// GetServerSideProps
//---------------------------------
export const getServerSideProps = async (ctx) => {
  // Fetch seat data
  const seat_data = await fetch(`${server}/api?type=seats&uid=${ctx.query.sid}`);
  const seat = await seat_data.json();

  if (!seat || 'message' in seat) {
    throw new Error('Unknown Seat');
  }

  try {
    return {
      props: {
        sid: ctx.query.sid,
        state: seat.state
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
export default Confirmation;
