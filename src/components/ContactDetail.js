import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import user from "../images/user.jpg";
const ContactDetails = (props) => {
    const history = useHistory()
    const {name, email} = history.location.state.state.contact
    return (
        <div className="main">
            <div className="ui card centered">
                <div className="image">
                    <img src={user} alt="user"/>
                </div>
                <div className="content">
                    <div className="header">{name}</div>
                    <div className="description">{email}</div>
                </div>
            </div>
        </div>
    );
}

export default ContactDetails