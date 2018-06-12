import React from 'react';

const ContactItem = ({ id, firstName, lastName, phoneNumber, deleteReq }) =>{
    const removeContact = () => {
        deleteReq(id)
    }

    return <div className="row center item">
        <div className="col s4">
            <p>{firstName}</p>
        </div>
        <div className="col s4">
            <p>{lastName}</p>
        </div>
        <div className="col s3">
            <p>{phoneNumber}</p>
        </div>
        <div className="col s1">
            <p className="delete" onClick={removeContact}>X</p>
        </div>
    </div>
    ;}

export default ContactItem;