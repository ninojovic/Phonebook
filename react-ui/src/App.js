import React, { Component, Fragment } from 'react';

import "./App.css"

import Header from "./partials/Header"
import Footer from "./partials/Footer"
import Main from "./Main"

import 'materialize-css/dist/css/materialize.min.css'

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
          <Main />
        <Footer />
      </Fragment>
    );
  }
}

export default App;