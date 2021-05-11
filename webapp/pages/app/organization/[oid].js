//---------------------------------
// AmbInt - Admin
// File : [oid].js
//
// @ version             1.0
//
// @ start date          06 05 2021
// @ last update         11 05 2021
//---------------------------------

//---------------------------------
// Imports
//---------------------------------
import React from "react";
import nookies from "nookies";

import { useAuth } from "../../../lib/auth";
import { auth } from "../../../lib/firebase-admin";

import { server } from "../../../config";
import App from "../../../layouts/App";

import Button from "../../../components/Button";
import RoomList from "../../../components/RoomList";
import InputField from "../../../components/InputField";

//---------------------------------
// component Organization
//---------------------------------
const Organization = ({ organization }) => {
  const { signOut } = useAuth();

  return (
    <>
      <div className="container mx-auto grid grid-cols-1 gap-8">
        <InputField />
        {
          Array.isArray(organization.rooms) &&
          <RoomList
            rooms={organization.rooms}
          />
        }
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
    const data = await fetch(`${server}/api/organizations/${uid}`);
    const organization = await data.json();

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
        destination: "/"
      },
      props: {}
    };
  }
};

//---------------------------------
// Exports
//---------------------------------
export default Organization;
