import React, { useState } from "react";

import { Link, useHistory } from "react-router-dom";

const EditContact = (props) => {
  const history = useHistory();
  const [contact,setStates] = useState(history.location.state.contact);
  const update = (e) => {
    e.preventDefault();
    if (contact.name === "" || contact.email === "") {
      alert("ALl the fields are mandatory!");
      return;
    }
    props.updateHandler(contact);
    history.push('/');
  };
  return (
      <div className="ui main">
        <h2>Edit Contact</h2>
        <form className="ui form" onSubmit={update}>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={contact.name}
              onChange={(e) => setStates({...contact, name: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={contact.email}
              onChange={(e) => setStates({...contact, email: e.target.value })}
            />
          </div>
          <button className="ui button blue">Update</button>
        </form>
        <Link to='/'>
            <button className="ui button blue right">Home</button>
        </Link>
      </div>
    )
  }

export default EditContact;