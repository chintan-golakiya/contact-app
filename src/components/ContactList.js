import { render } from "@testing-library/react";
import React, {useRef, useState} from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";
const ContactList = (props) => {
  const [term, setTerm] = useState(props.term);

    const deleteContactHanlder = (id) => {
        props.deleteHandler(id)
    }

    // const updateContactHandler = (contactNew) => {
    //   props.updateHandler(contactNew);
    // }

    const renderContactList = props.contacts.map((contact)=>{
        return (
            <ContactCard 
                contact={contact} 
                deleteHandler={deleteContactHanlder}
                // updateHandler={updateContactHandler}
                key = {contact.id} />
        );
    })

    const getSearchTerm = ()=> {
      console.log(term);
      props.searchKeyword(term);
    }
    
    return (
        <div className="main">
          <h2>
            Contact List
            <Link to='/add'>
            <button className="ui button blue right">Add Contact</button>
            </Link>
          </h2>
          <div className="ui serach">
            <div className="ui icon input">
              <input
                type="text"
                value={term}
                placeholder= "search contacts" className="prompt"
                onChange={(e)=>setTerm(e.target.value)}/>
              
              
            </div>
            <i className="search icon" onClick={getSearchTerm}></i>
          </div>
          <div className="ui celled list">
            {renderContactList.length > 0 ? renderContactList : "No Contancts"}
          </div>
        </div>
    )
};

export default ContactList