//---------------------------------
// AmbInt - Admin
// File : [rid].js
//
// @ version             1.0
//
// @ start date          06 05 2021
// @ last update         09 05 2021
//---------------------------------

//---------------------------------
// Imports
//---------------------------------
import Link from 'next/link';
import { useRouter } from 'next/router';

import { server } from '../../../../../config';
import App from '../../../../../layouts/App';

import Button from '../../../../../components/Button';
import FloorList from '../../../../../components/FloorList';
import InputField from '../../../../../components/InputField';

//---------------------------------
// component Room
//---------------------------------
const room = ({ room }) => {
  return (
    <>
      <div className="container mx-auto grid grid-cols-1 gap-8">
        <h1>Organization: {'TODO'}</h1>
        <InputField />
        <FloorList
          floors={[
            {id: 1},
            {id: 2},
            {id: 3}
          ]}
        />
        <div class="flex items-center justify-center">
          <Button />
          <Button />
        </div>
      </div>
    </>
  )
};

room.layout = App;

//---------------------------------
// GetStaticProps
//---------------------------------
export const getStaticProps = async (context) => {
  const res = await fetch(`${server}/api/organizations/${context.params.id}`)

  const room = await res.json()

  return {
    props: {
      room
    }
  };
}

//---------------------------------
// GetStaticPaths
//---------------------------------
export const getStaticPaths = async () => {
  const res = await fetch(`${server}/api/organizations`)

  const rooms = await res.json()

  const rids = rooms.map((room) => room.id)
  const paths = rids.map((rid) => ({
    params: {
      oid: rid.toString(),
      rid: rid.toString()
    }
  }))

  return {
    paths,
    fallback: false
  };
}

//---------------------------------
// Exports
//---------------------------------
export default room;
