import React from "react";
import { Link, useHistory } from "react-router-dom";
import user from "../images/user.jpg";
const ContactCard = (props) => {
    const {id, name, email} = props.contact
    const history = useHistory();
    const goToDetails = () => {
        history.push(`/contact/${id}`,{contact:props.contact})
    }

    return (
        <div className="item">
            <img className="ui avatar image" src={user} alt="user"/>
            <div className="content" onClick={goToDetails}>
                <div className="header">{name}</div>
                <div>{email}</div>
            </div>
            <Link to={{pathname: "/edit", state: {contact:props.contact,updateHandler:props.updateHalder}}}>
            <i className="edit alternate outline icon"
            style={{color:"blue",marginTop:"7px", marginLeft:"10px"}}/>
            </Link>
            <i className="trash alternate outline icon"
            style={{color:"red",marginTop:"7px"}} onClick={()=>props.deleteHandler(id)}/>
        </div>
    )
}

export default ContactCard