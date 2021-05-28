//---------------------------------
// AmbInt - Admin
// File : Settings.js
//
// @ version             1.0
//
// @ start date          20 05 2021
// @ last update         28 05 2021
//---------------------------------

//---------------------------------
// Imports
//---------------------------------
import React, { useState } from 'react';

import { create, update } from 'lib/firebase/db';

// Components
import Dropdown from './Dropdown';
import Toogle from './Toogle';

//---------------------------------
// component Settings
//---------------------------------
const Settings = ({
  collection,
  uid = null,

  values = {},
  addon = {},

  title = 'ADD',
  method = 'CREATE',
  invisible = null,
  server = ''
}) => {
  let init = {};

  for (const [key, value] of Object.entries(values)) {
    if (key !== invisible) {
      if (Array.isArray(value)) {
        if (value.length > 0)  {
          init[key] = value[0].displayName;
        } else {
          init[key] = undefined;
        }
      } else {
        init[key] = value;
      }
    }
  }

  // State manager
  const [form, setForm] = useState(init);
  const [number, setNumber] = useState(1);

  const [floors, setFloors] = useState([]);

  // Event handlers
  const handleChange = async (name, value) => {
    if (collection === 'rooms' && method === 'CREATE' && name.toLowerCase() === 'building') {
      try {
        const data = await fetch(`${server}/api?type=buildings&uid=${value}`);
        const b = await data.json();
        setFloors(b.floors || []);
      } catch (e) {
        console.log(e);
      }
    }

    setForm((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleChange__ = () => async (e) => {
    const name = e.target.placeholder;
    const value = e.target.value;

    if (name === 'seats') {
      setNumber(value);
      return;
    }

    setForm((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    switch (method) {
      case 'CREATE':
        let bid = {};
        if (invisible === 'building') {
          let j = 0;
          for (let i = 0; i < values.length; i++) {
            if (values[i].uid === form.room) {
              j = i;
              break;
            }
          }

          bid = { building: values.building[j] };
        }

        if (collection === 'seats') {
          const currentDate = new Date();
          for (let i = 0; i < parseInt(number); i++) {
            create(collection, {
              ...addon,
              ...form,
              ...bid,
              ...{ displayName: `${currentDate.getSeconds()}_${i}` }
            });
          }
        } else {
          create(collection, {
            ...addon,
            ...form,
            ...bid
          });
        }

        break;

      case 'UPDATE':
        update(collection, { ...addon, ...form }, uid);
        break;

      default:
        throw new Error('Invalid method');
    };
  };

  return (
    <section className="flex flex-col items-center justify-center">
      <form
        acceptCharset='UTF-8'
        className="container max-w-2xl mx-auto shadow-md md:w-3/4"
        method='POST'
        onSubmit={handleSubmit}
      >
        <div className="p-4 bg-gray-100 border-t-2 border-gray-700 rounded-lg bg-opacity-5">
          <div className="max-w-sm mx-auto md:w-full md:mx-0">
            <div className="inline-flex items-center space-x-4">
              <h1 className="text-gray-600">
                SETTINGS
              </h1>
            </div>
          </div>
        </div>
        <div className="space-y-6 bg-white">
          {
            Object.keys(values).map((key, index) => {
              if (key === invisible) {
                return null;
              }

              if (collection === 'seats' && key === 'displayName' && method === 'CREATE') {
                return (
                  <>
                    <input
                      type="number"
                      placeholder='seats'
                      className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      onChange={handleChange__()}
                      value={number}
                    />
                  </>
                );
              }

              return (
                <>
                  <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                    <h2 className="max-w-sm mx-auto md:w-1/3">
                      {key.toUpperCase()}
                    </h2>
                    <div className="max-w-sm mx-auto md:w-2/3 flex flex-row-reverse">
                      <div className=" relative ">
                        {
                          (typeof values[key] === "boolean") &&
                          <Toogle
                            toogle={values[key]}
                            callback={(v) => {
                              handleChange(key, v);
                            }}
                          />
                        }
                        {
                          Array.isArray(values[key]) && key !== 'floor' &&
                          <Dropdown
                            options={values[key]}
                            callback={(v) => {
                              handleChange(key, v);
                            }}
                          />
                        }
                        {
                          Array.isArray(values[key]) && key === 'floor' &&
                          <Dropdown
                            options={floors}
                            callback={(v) => {
                              handleChange(key, v);
                            }}
                          />
                        }
                        {
                          (typeof values[key] === "string") &&
                          <input
                            type="text"
                            placeholder={key}
                            className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            onChange={handleChange__()}
                            value={form[key]}
                          />
                        }
                      </div>
                    </div>
                  </div>
                  <hr/>
                </>
              );
            })
          }
          <div className="w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
            <button type="submit" className="py-2 px-4  bg-green-500 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
              {title}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

//---------------------------------
// Exports
//---------------------------------
export default Settings;
