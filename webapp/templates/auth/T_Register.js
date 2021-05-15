//---------------------------------
// AmbInt - Admin
// File : T_Register.js
//
// @ author              gm0l74
// @ version             1.0
//
// @ start date          15 05 2021
// @ last update         15 05 2021
//---------------------------------

//---------------------------------
// Imports
//---------------------------------
import React, { useState } from 'react';

import { AUTH_TABS } from './auth.tabs.js';
import { useAuth } from 'lib/firebase/auth';

//---------------------------------
// Template T_Register
//---------------------------------
const T_Register = ({ changeTab }) => {
  // State manager
  const [form, setForm] = useState({
    email: '',
    username: '',
    password: '',
    confirmation: ''
  });

  // Authentication interface
  const { signUpWithEmailAndPassword } = useAuth();

  // Event handlers
  const handleChange = () => (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO
    signUpWithEmailAndPassword(form.email, form.username, form.password);
  };

  // JSX
  return (
    <div className='auth'>
      <div className='auth__container'>
        <ul className='auth__switcher auth-switcher auth-trigger'>
          <li>
            <button
              onClick={() => changeTab(AUTH_TABS.LOGIN)}
            >
              LOGIN
            </button>
          </li>
          <li>
            <button className='auth-switcher-selected'>
              REGISTER
            </button>
          </li>
        </ul>
        <div
          className='auth__block auth-block'
          data-type='signup'
        >
          <form
            acceptCharset='UTF-8'
            className='auth__form form-register'
            method='POST'
            onSubmit={handleSubmit}
          >
            <p className='auth-fieldset'>
              <label
                className='auth-label auth-label--email auth-label-img'
              >
                Email
              </label>
              <input
                className='auth-input auth-input-fw auth-input-hp auth-input-hb'
                id='signup-email'
                type='email'
                name='email'
                placeholder='EMAIL'
                autoComplete='on'
                required
                value={form.email}
                onChange={handleChange()}
              />
            </p>
            <p className='auth-fieldset'>
              <label
                className='auth-label auth-label--username auth-label-img'
              >
                Username
              </label>
              <input
                className='auth-input auth-input-fw auth-input-hp auth-input-hb'
                id='signup-username'
                type='text'
                name='username'
                placeholder='USERNAME'
                autoComplete='on'
                required
                value={form.username}
                onChange={handleChange()}
              />
            </p>
            <p className='auth-fieldset'>
              <label
                className='auth-label auth-label--password auth-label-img'
              >
                Password
              </label>
              <input
                className='auth-input auth-input-fw auth-input-hp auth-input-hb'
                id='signup-password'
                type='password'
                name='password'
                placeholder='PASSWORD'
                autoComplete='off'
                required
                value={form.password}
                onChange={handleChange()}
              />
            </p>
            <p className='auth-fieldset'>
              <label
                className='auth-label auth-label--password auth-label-img'
              >
                Password
              </label>
              <input
                className='auth-input auth-input-fw auth-input-hp auth-input-hb'
                id='signup-conf-password'
                type='password'
                name='confirmation'
                placeholder='CONFIRM PASSWORD'
                autoComplete='off'
                required
                value={form.confirmation}
                onChange={handleChange()}
              />
            </p>
            <p className='auth-fieldset'>
              <span className='auth-info'>
                ERROR
              </span>
              <button
                id='auth-register-btn'
                className='auth-input auth-input-fw'
                type='submit'
              >
                <p className='title'>
                  REGISTER
                </p>
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

//---------------------------------
// Exports
//---------------------------------
export default T_Register;
