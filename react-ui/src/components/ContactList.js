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

    componentWillReceiveProps(nextProps) {
        if (nextProps.reload !== this.props.reload) {
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

    filterContacts = (contacts, filterValue) => {
        const filtered = contacts.filter(({ lastName }) => {
            let normalizedLastName = lastName.toLowerCase();
            let normalizedSearchValue = filterValue.toLowerCase();

            return (normalizedLastName.indexOf(normalizedSearchValue) !== -1)
        })

        return filtered;
    }

    render() {
        const { contacts } = this.state

        const filtered = this.filterContacts(contacts, this.props.searchValue)

        return (
            <div className="row">
                <div className="col m8 offset-m2 s12">
                    <div className="row labels">
                        <div className="col m4 s3">
                            <p>Name</p>
                        </div>
                        <div className="col m4 s4">
                            <p>Surname</p>
                        </div>
                        <div className="col m3 s4">
                            <p>Number</p>
                        </div>
                    </div>
                    {
                        (filtered.length) ?
                            filtered.map(({ firstName, lastName, phoneNumber, id }) =>
                                <ContactItem firstName={firstName} lastName={lastName} phoneNumber={phoneNumber} key={id} id={id} deleteReq={this.deleteReq} />
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