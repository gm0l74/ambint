//---------------------------------
// AmbInt - Admin
// File : [oid]/index.js
//
// @ version             1.0
//
// @ start date          06 05 2021
// @ last update         20 05 2021
//---------------------------------

//---------------------------------
// Imports
//---------------------------------
import React from 'react';
import { useRouter } from 'next/router';
import nookies from 'nookies';

import { useAuth } from 'lib/firebase/auth';
import { auth } from 'lib/firebase/firebase-admin';

import { server } from 'config/index';
import App from 'layouts/App';

import Button from 'components/Button';

//---------------------------------
// Page Organization
//---------------------------------
const Organization = ({ organization }) => {
  const { signOut } = useAuth();
  const router = useRouter();

  return (
    <>
      <div>
        <p className='text-center text-xl font-bold mb-2'>
          {organization.displayName}
        </p>
        <p className='text-center text-lg mb-8'>
          {organization.uid}
        </p>
        <div className='container mx-auto grid grid-cols-2 gap-8'>
          <Button
            icon='building'
            title='BUILDINGS'
            callback={(e) => {
              e.preventDefault();
              router.push(`/app/${organization.uid}/b`);
            }}
          />
          <Button
            icon='door-open'
            title='ROOMS'
            callback={(e) => {
              e.preventDefault();
              router.push(`/app/${organization.uid}/r`);
            }}
          />
          <Button
            icon='chair'
            title='SEATS'
            callback={(e) => {
              e.preventDefault();
              router.push(`/app/${organization.uid}/s`);
            }}
          />
          <Button
            icon='sign-out-alt'
            title='SIGN OUT'
            callback={signOut}
          />
        </div>
      </div>
    </>
  )
};

Organization.layout = App;

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
    const data = await fetch(`${server}/api?type=users&uid=${ctx.query.oid}`);
    const organization = await data.json();

    if (!organization || 'message' in organization) {
      throw new Error('Unknown Organization');
    }

    return {
      props: {
        organization: organization,
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
export default Organization;
