import React, { Component } from 'react';

import ContactList from './components/ContactList'

// import fetchService from "../../services/fetchService"

class Main extends Component {
    render() {
        return (
            <main className="container">
                <ContactList />
            </main>
        );
    }
}

export default Main;