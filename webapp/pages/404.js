//---------------------------------
// AmbInt - Admin
// File : 404.js
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
// class Error404
//---------------------------------
class Error404 extends Component {
  componentDidMount = () => {
    Router.push('/');
  };

  render() {
    return <div>404 not found</div>;
  }
}

//---------------------------------
// Exports
//---------------------------------
export default Error404;
