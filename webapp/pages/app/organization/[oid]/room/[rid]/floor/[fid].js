//---------------------------------
// AmbInt - Admin
// File : [fid].js
//
// @ version             1.0
//
// @ start date          06 05 2021
// @ last update         08 05 2021
//---------------------------------

//---------------------------------
// Imports
//---------------------------------
import Link from 'next/link';
import { useRouter } from 'next/router';

import { server } from '../../../../../../../config';
import App from '../../../../../../../layouts/App';

import InputField from '../../../../../../../components/InputField';
import Button from '../../../../../../../components/Button';

//---------------------------------
// component Floor
//---------------------------------
const floor = ({ floor }) => {
  return (
    <>
    <div className="container mx-auto grid grid-cols-1 gap-8">
      <h1>Organization: {'TODO'}</h1>
      <h1>Room: {'TODO'}</h1>
      <InputField />
      <InputField />
      <InputField />
      <div class="flex items-center justify-center">
        <Button />
        <Button />
      </div>
    </div>
    </>
  )
};

floor.layout = App;

//---------------------------------
// GetStaticProps
//---------------------------------
export const getStaticProps = async (context) => {
  const res = await fetch(`${server}/api/organizations/${context.params.id}`)

  const floor = await res.json()

  return {
    props: {
      floor
    }
  };
}

//---------------------------------
// GetStaticPaths
//---------------------------------
export const getStaticPaths = async () => {
  const res = await fetch(`${server}/api/organizations`)

  const floors = await res.json()

  const fids = floors.map((floor) => floor.id)
  const paths = fids.map((fid) => ({
    params: {
      oid: fid.toString(),
      rid: fid.toString(),
      fid: fid.toString()
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
export default floor;
