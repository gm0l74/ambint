//---------------------------------
// AmbInt - Admin
// File : [oid].js
//
// @ version             1.0
//
// @ start date          06 05 2021
// @ last update         07 05 2021
//---------------------------------
import React from "react";
import Link from 'next/link';
import { useRouter } from 'next/router';

import QRCode from "react-qr-code";

import { server } from '../../../config';
import App from '../../../layouts/App';

import Button from '../../../components/Button';
import RoomList from '../../../components/RoomList';
import InputField from '../../../components/InputField';

import { useAuth } from '../../../lib/auth';
import { auth } from '../../../lib/firebase-admin';

import nookies from "nookies";

//---------------------------------
// component Organization
//---------------------------------
const organization = ({ organization }) => {
  const { signOut } = useAuth();

  return (
    <>
      <div className="container mx-auto grid grid-cols-1 gap-8">
        <InputField />
        <RoomList
          rooms={[
            {id: 1},
            {id: 2},
            {id: 3}
          ]}
        />
        <div class="flex items-center justify-center">
          <Button />
          <Button />
          <button
            onClick={signOut}
          >
            Sign out
          </button>
        </div>
      </div>
    </>
  )
};

organization.layout = App;

//---------------------------------
// GetServerSideProps
//---------------------------------
export const getServerSideProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx);
    const token = await auth.verifyIdToken(cookies.token);

    // the user is authenticated!
    const { uid, email } = token;

    // the user is authenticated!
    // FETCH STUFF HERE

    const res = await fetch(`${server}/api/organizations/${ctx.params.id}`);

    const organization = await res.json();

    return {
      props: {
        message: `Your email is ${email} and your UID is ${uid}.`,
        organization: organization
      },
    };
  } catch (err) {
    // Redirect to the authentication page
    return {
      redirect: {
        permanent: false,
        destination: "/"
      },
      props: {}
    };
  }
};

// //---------------------------------
// // GetStaticProps
// //---------------------------------
// export const getStaticProps = async (context) => {
//   const res = await fetch(`${server}/api/organizations/${context.params.id}`);
//
//   const organization = await res.json();
//
//   return {
//     props: { organization }
//   };
// };
//
// //---------------------------------
// // GetStaticPaths
// //---------------------------------
// export const getStaticPaths = async () => {
//   const res = await fetch(`${server}/api/organizations`);
//
//   const organizations = await res.json();
//
//   const oids = organizations.map((organization) => organization.id);
//   const paths = oids.map((oid) => ({ params: { oid: oid.toString() } }))
//
//   return {
//     paths,
//     fallback: false
//   };
// }

//---------------------------------
// Exports
//---------------------------------
export default organization;
