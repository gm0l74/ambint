//---------------------------------
// AmbInt - Admin
// File : _error.js
//
// @ version             1.0
//
// @ start date          06 05 2021
// @ last update         06 05 2021
//---------------------------------

//---------------------------------
// Imports
//---------------------------------
import React, { Component } from 'react';
import Router from 'next/router';

//---------------------------------
// class Error
//---------------------------------
class Error extends Component {
  componentDidMount = () => {
    Router.push('/');
  };

  render() {
    return <div />;
  }
}

//---------------------------------
// Exports
//---------------------------------
export default Error;
