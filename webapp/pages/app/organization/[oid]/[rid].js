//---------------------------------
// AmbInt - Admin
// File : [rid].js
//
// @ version             1.0
//
// @ start date          06 05 2021
// @ last update         16 05 2021
//---------------------------------

//---------------------------------
// Imports
//---------------------------------
import Link from 'next/link';
import { useRouter } from 'next/router';

import { server } from 'config/index';
import App from 'layouts/App';

import Button from 'components/Button';
import FloorList from 'components/FloorList';
import InputField from 'components/InputField';

//---------------------------------
// component Room
//---------------------------------
const room = ({ room }) => {
  return (
    <>
      <div className='container mx-auto grid grid-cols-1 gap-8'>
        <h1>Organization: {'TODO'}</h1>
        <InputField />
        <FloorList
          floors={[
            {id: 1},
            {id: 2},
            {id: 3}
          ]}
        />
        <div className='flex items-center justify-center'>
          <Button />
          <Button />
        </div>
      </div>
    </>
  )
};

room.layout = App;

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

    // Fetch organization data
    const data = await fetch(`${server}/api/organizations/${uid}`);

    const organization = await data.json()

    return {
      props: {
        organization: organization
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
export default room;
