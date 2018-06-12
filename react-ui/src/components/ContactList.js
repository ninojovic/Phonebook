import React, { Component } from 'react';

import CommService from "../services/CommService";

class ContactList extends Component {
    state = {
        contacts: []
    }

    componentDidMount(){
        CommService.getContacts()
            .then(contacts => {
                this.setState({ contacts })
                console.log(contacts)
            })
    }

    render() {
        console.log(this.state.contacts);
        return (
            <div className="row center labels">
                <div className="col s4">
                    <p>Name</p>
                </div>
                <div className="col s4">
                    <p>Surname</p>
                </div>
                <div className="col s4">
                    <p>Number</p>
                </div>
            </div>
        );
    }
}

export default ContactList;