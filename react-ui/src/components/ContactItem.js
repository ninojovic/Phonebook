import React from 'react';

const ContactItem = ({ id, firstName, lastName, phoneNumber, deleteReq }) =>{
    const removeContact = () => {
        deleteReq(id)
    }

    return <div className="row item">
        <div className="col m4 s3">
            <p>{firstName}</p>
        </div>
        <div className="col m4 s4">
            <p>{lastName}</p>
        </div>
        <div className="col m3 s4 ">
            <p>{phoneNumber}</p>
        </div>
        <div className="col m1 s1">
            <p className="delete" onClick={removeContact}>X</p>
        </div>
    </div>
    ;}

export default ContactItem;