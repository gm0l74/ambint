//---------------------------------
// AmbInt - Admin
// File : register.js
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
import Auth from "layouts/Auth.js";

import { useAuth } from '../../lib/auth';

//---------------------------------
// Page RegisterTemplate
//---------------------------------
const RegisterTemplate = ({ change }) => {
  const { signUpWithEmailAndPassword } = useAuth();

  const [form, setForm] = useState({
    email: '',
    username: '',
    password: '',
    confirmation: ''
  });

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

      signUpWithEmailAndPassword(
        formData.get('email'),
        formData.get('username'),
        formData.get('password')
      );
  };

  return (
    <div className="auth">
  		<div className="auth__container">
  			<ul className="auth__switcher auth-switcher auth-trigger">
  				<li>
            <a href="#" onClick={change}>
              LOGIN
            </a>
          </li>
  				<li>
            <a href="#"  className="auth-switcher-selected">
              REGISTER
            </a>
          </li>
  			</ul>
  			<div
          className="auth__block auth-block"
          data-type="signup"
        >
  				<form
            acceptCharset="UTF-8"
            className="auth__form form-register"
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
                id="signup-email"
                type="email"
                name="email"
                placeholder="EMAIL"
                autoComplete="on"
                required
                value={form.email}
                onChange={handleChange()}
              />
  					</p>
  					<p className="auth-fieldset">
  						<label
                className="auth-label auth-label--username auth-label-img"
              >
                Username
              </label>
  						<input
                className="auth-input auth-input-fw auth-input-hp auth-input-hb"
                id="signup-username"
                type="text"
                name="username"
                placeholder="USERNAME"
                autoComplete="on"
                required
                value={form.username}
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
                id="signup-password"
                type="password"
                name="password"
                placeholder="PASSWORD"
                autoComplete="off"
                required
                value={form.password}
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
                id="signup-conf-password"
                type="password"
                name="confirmation"
                placeholder="CONFIRM PASSWORD"
                autoComplete="off"
                required
                value={form.confirmation}
                onChange={handleChange()}
              />
  					</p>
            <p className="auth-fieldset">
  						<button
                id="auth-register-btn"
                className="auth-input auth-input-fw"
                type="submit"
              >
                <p className="title">
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

RegisterTemplate.layout = Auth;

//---------------------------------
// Exports
//---------------------------------
export default RegisterTemplate;
