//---------------------------------
// AmbInt - Admin
// File : login.js
//
// @ version             1.0
//
// @ start date          06 05 2021
// @ last update         11 05 2021
//---------------------------------

//---------------------------------
// Imports
//---------------------------------
import React, { useState } from 'react';
import Auth from 'layouts/Auth.js';

import { useAuth } from '../../lib/auth';

//---------------------------------
// Page LoginTemplate
//---------------------------------
const LoginTemplate = ({ change }) => {
  const { signInWithEmailAndPassword } = useAuth();

  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = () => (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData();
      Object.entries(form).forEach(([ key, value ]) => {
        formData.append(key, value);
      });

      signInWithEmailAndPassword(formData.get('email'), formData.get('password'));
  };

  return (
    <div className="auth">
  		<div className="auth__container">
  			<ul className="auth__switcher auth-switcher auth-trigger">
  				<li>
            <a href="#" className="auth-switcher-selected">
              LOGIN
            </a>
          </li>
  				<li>
            <a href="#" onClick={change}>
              REGISTER
            </a>
          </li>
  			</ul>
  			<div
          className="auth__block auth-block"
          data-type="login"
        >
  				<form
            acceptCharset="UTF-8"
            className="auth__form form-login"
            method="POST"
            onSubmit={handleSubmit}
          >
  					<p className="auth-fieldset">
  						<label
                className="auth-label auth-label--email auth-label-img"
              >
                Email
              </label>
  						<input
                className="auth-input auth-input-fw auth-input-hp auth-input-hb"
                id="signin-email"
                name="email"
                type="email"
                placeholder="EMAIL"
                autoComplete="on"
                required
                value={form.email}
                onChange={handleChange()}
              />
  					</p>
  					<p className="auth-fieldset">
  						<label
                className="auth-label auth-label--password auth-label-img"
              >
                Password
              </label>
  						<input
                className="auth-input auth-input-fw auth-input-hp auth-input-hb"
                id="signin-password"
                type="password"
                placeholder="PASSWORD"
                autoComplete="off"
                required
                name="password"
                value={form.password}
                onChange={handleChange()}
              />
  					</p>
  					<p className="auth-fieldset">
  						<button
                id="auth-login-btn"
                className="auth-input auth-input-fw"
                type="submit"
              >
                <p className="title">
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

LoginTemplate.layout = Auth;

//---------------------------------
// Exports
//---------------------------------
export default LoginTemplate;
