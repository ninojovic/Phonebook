import React, { Component } from 'react';

import CommService from "../services/CommService";
import Contact from "../entities/Contact";
import ContactItem from "./ContactItem"

class ContactList extends Component {
    state = {
        contacts: [],
    }

    componentDidMount() {
        this.fetchAndMap();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.reload !== this.props.reload){
            this.fetchAndMap();
        }
    }

    fetchAndMap() {
        CommService.getContacts()
            .then(data => {
                const contacts = data.map(({ id, first_name, last_name, phone_number }) => new Contact(id, first_name, last_name, phone_number));
                this.setState({ contacts });
            })
    }

    deleteReq = (id) => {
        CommService.deleteContact(id)
            .then(() => {
                this.fetchAndMap();
            })
    }

    render() {
        const { contacts } = this.state
        return (
            <div className="row">
                <div className="col s8 offset-s2">
                    <div className="row center labels">
                        <div className="col s4">
                            <p>Name</p>
                        </div>
                        <div className="col s4">
                            <p>Surname</p>
                        </div>
                        <div className="col s3">
                            <p>Number</p>
                        </div>
                    </div>
                    {
                        (contacts.length) ?
                            contacts.map(({ firstName, lastName, phoneNumber, id }) =>
                                <ContactItem firstName={firstName} lastName={lastName} phoneNumber={phoneNumber} key={id} id={id} deleteReq={this.deleteReq}/>
                            ) :
                            <div>
                                <div className="row center">
                                    <h2>NO CONTACTS TO SHOW</h2>
                                </div>
                            </div>
                    }
                </div>
            </div>
        );
    }
}

export default ContactList;