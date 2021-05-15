//---------------------------------
// AmbInt - Admin
// File : T_Login.js
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
// Template T_Login
//---------------------------------
const T_Login = ({ changeTab }) => {
  // State manager
  const [form, setForm] = useState({ email: '', password: '' });

  // Authentication interface
  const { signInWithEmailAndPassword } = useAuth();

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
    signInWithEmailAndPassword(form.email, form.password);
  };

  // JSX
  return (
    <div className='auth'>
      <div className='auth__container'>
        <ul className='auth__switcher auth-switcher auth-trigger'>
          <li>
            <button className='auth-switcher-selected'>
              LOGIN
            </button>
          </li>
          <li>
            <button
              onClick={() => changeTab(AUTH_TABS.REGISTER)}
            >
              REGISTER
            </button>
          </li>
        </ul>
        <div
          className='auth__block auth-block'
          data-type='login'
        >
          <form
            acceptCharset='UTF-8'
            className='auth__form form-login'
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
                id='signin-email'
                name='email'
                type='email'
                placeholder='EMAIL'
                autoComplete='on'
                required
                value={form.email}
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
                id='signin-password'
                type='password'
                placeholder='PASSWORD'
                autoComplete='off'
                required
                name='password'
                value={form.password}
                onChange={handleChange()}
              />
            </p>
            <p className='auth-fieldset'>
              <span className='auth-info'>
                ERROR
              </span>
              <button
                id='auth-login-btn'
                className='auth-input auth-input-fw'
                type='submit'
              >
                <p className='title'>
                  LOGIN
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
export default T_Login;
