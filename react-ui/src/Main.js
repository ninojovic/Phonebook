import React, { Component } from 'react';

import ContactList from './components/ContactList'

import CommService from "./services/CommService"
import Validation from "./services/ValidationService"

class Main extends Component {
    state = {
        showForm: false,
        nameValue: "",
        surnameValue: "",
        numberValue: "",
        updateContactList: true,
        searchValue: "",
    }

    toggleForm = () => {
        this.setState({ showForm: !this.state.showForm });
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submit = (e) => {
        const { nameValue, surnameValue, numberValue } = this.state;
        
        if(!Validation.validateName(nameValue) || !Validation.validateName(surnameValue)){
            alert("First and Last name must start with Capital letter and cannot be empty");
            return;
        }

        if(!Validation.validateNumber(numberValue)){
            alert("Please enter a valid number");
            return;
        }

        const body = {
            "first_name": nameValue,
            "last_name": surnameValue,
            "phone_number": numberValue
        }


        CommService.addContact(body)
            .then((res) => {
                this.setState({
                    nameValue: "",
                    surnameValue: "",
                    numberValue: "",
                    updateContactList: !this.state.updateContactList
                })
            })
    }

    enter = (e) => {
        console.log(e.target.keyCode)
    }

    render() {
        return (
            <main className="container">
                <div className="row">
                    <div className="col s8 offset-s2">
                        <div className="col s8 addContact">
                            <button className="btn modal-trigger" onClick={this.toggleForm}>ADD contact</button>
                        </div>
                        <div className="col s4">
                            <input className="search" type="text" name="searchValue" onChange={this.handleChange} placeholder="search for surname" />
                        </div>
                    </div>
                    <form className={`col s8 offset-s2 center ${(this.state.showForm) ? "show" : "hide"}`}>
                        <div className="col s4">
                            <label>First Name:</label>
                            <input type="text" name="nameValue" value={this.state.nameValue} onChange={this.handleChange} />
                        </div>
                        <div className="col s4">
                            <label>Last Name:</label>
                            <input type="text" name="surnameValue" value={this.state.surnameValue} onChange={this.handleChange} />
                        </div>
                        <div className="col s4">
                            <label>Phone Number:</label>
                            <input type="text" name="numberValue" value={this.state.numberValue} onChange={this.handleChange} />
                        </div>
                        <div className="col s4 offset-s4">
                            <button onClick={(e) => { e.preventDefault(); this.submit(e) }} className="btn submit">submit</button>
                        </div>
                    </form>
                    <ContactList reload={this.state.updateContactList} searchValue={this.state.searchValue}/>
                </div>
            </main>
        );
    }
}

export default Main;