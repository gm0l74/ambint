//---------------------------------
// AmbInt - Admin
// File : List.js
//
// @ version             1.0
//
// @ start date          20 05 2021
// @ last update         20 05 2021
//---------------------------------

//---------------------------------
// Documentation
//---------------------------------
// Inspired by:
// https://www.tailwind-kit.com/components/list (withHeader)

//---------------------------------
// Imports
//---------------------------------
import Link from 'next/link';

//---------------------------------
// component List
//---------------------------------
const List = ({
  url,
  icon = 'building',
  title = 'List',
  content = []
}) => {
  return (
    <div
      className="container flex flex-col w-full m-4 bg-white rounded-lg shadow"
      style={{ maxHeight: '400px', overflowY: 'auto'}}
    >
      <div className="px-4 py-5 sm:px-6 border-b w-full">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {title}
        </h3>
      </div>
      <ul className="flex flex-col divide divide-y">
      {
        content.map((item, i) => {
          const far_right = ('n_seats' in item) ? item.n_seats : item.state;

          return (
            <Link href={`${url}/${item.uid}`}>
              <li className="flex flex-row">
                <div className="select-none cursor-pointer flex flex-1 items-center p-4">
                  <div className="flex flex-col w-10 h-10 justify-center items-center mr-4">
                    <a href="#" className="block relative">
                      <i className={`fas fa-${icon} text-lg`}></i>
                    </a>
                  </div>
                  <div className="flex-1 pl-1 mr-16">
                    <div className="font-medium">
                      {item.displayName}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {item.uid}
                    </div>
                  </div>
                  <div className="text-gray-600 text-xs">
                    {far_right}
                  </div>
                  <button className="w-24 text-right flex justify-end">
                    <svg width="20" fill="currentColor" height="20" className="hover:text-gray-800 text-gray-500" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z">
                      </path>
                    </svg>
                  </button>
                </div>
              </li>
            </Link>
          );
        })
      }
      </ul>
    </div>
  );
};

//---------------------------------
// Exports
//---------------------------------
export default List;
