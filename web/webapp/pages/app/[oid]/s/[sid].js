//---------------------------------
// AmbInt - Admin
// File : s/[sid].js
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
import { toogle } from 'lib/firebase/db';

import { server } from 'config/index';
import App from 'layouts/App';

// Components
import QrCode from 'components/QrCode';
import Button from 'components/Button';

//---------------------------------
// Page Seat
//---------------------------------
const Seat = ({ seat, oid }) => {
  const router = useRouter();

  const color = (seat.state) ? 'red' : 'green';

  return (
    <>
      <div>
        <p className='text-center text-xl font-bold mb-2'>
          {seat.displayName}
        </p>
        <p className='text-center text-lg mb-8'>
          {seat.uid}
        </p>
        <div className='container mx-auto grid grid-cols-2 gap-8'>
          <QrCode data={`https://ambint.herokuapp.com/c/${seat.uid}`} />
          <div>
            <Button
              icon='arrow-circle-left'
              title='BACK'
              callback={(e) => {
                e.preventDefault();
                router.push(`/app/${oid}`);
              }}
            />

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
                        toogle(seat.uid, true);
                      }}
                    >
                      SEAT
                    </button>
                    <button
                      type="button"
                      className="py-6 px-10 bg-white hover:bg-gray-100 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-indigo-500 text-2xl text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
                      onClick={(e) => {
                        e.preventDefault();
                        toogle(seat.uid, false);
                      }}
                    >
                      LEAVE
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

Seat.layout = App;

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
    const data = await fetch(`${server}/api?type=seats&uid=${ctx.query.sid}`);
    const seat = await data.json();

    if (!seat || 'message' in seat) {
      throw new Error('Unknown Seat');
    }

    return {
      props: {
        seat: seat,
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
export default Seat;
