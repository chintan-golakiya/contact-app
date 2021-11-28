import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetails from './ContactDetail';
import contactApi from '../api/contact';
import './App.css';
import EditContact from './EditContact';

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const addContactHandler = async (contact) => {
    const request = {id: uuidv4(), ...contact}
    const res = await contactApi.post('/contact',request);
    setContacts([...contacts, res.data ]);
  };
  const removeContactHandler = async (id) => {
    await contactApi.delete(`/contact/${id}`)
    const newContacts = contacts.filter((contact)=> {
      return contact.id !== id;
    })
    setContacts(newContacts);
  }

  const updateContactHandler = async (contact) => {
    const res = await contactApi.put(`/contact/${contact.id}`,contact);
    const newContacts = contacts.map((c)=> {
      return c.id === res.data.id ? { ...res.data} : c ;
    })
    setContacts(newContacts)
  }

  const retriveContacts =  async () => {
    const response = await contactApi.get('/contact');
    return response;
  }

  const searchHandler = (term) => {
    setSearchTerm(term);
    if(searchTerm !== "") {
      const newContact = contacts.filter((contact)=>{
        return Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
      })
      setSearchResult(newContact);
    } else {
      setSearchResult(contacts);
    }
  }

  useEffect( () => {
    const getAllContacts = async()=>{
      const allContacts = await retriveContacts();
      if(allContacts) setContacts(allContacts.data);
    };
    getAllContacts();
  } , [])
  useEffect( () => {
  } , [contacts])
  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
          <Route 
            path='/add' exact 
            component = {()=>(
              <AddContact
                addContactHandler={addContactHandler}
              /> 
            )}
          />
          <Route 
            path='/' exact 
            component = { ()=> (
              <ContactList
                contacts={searchTerm.length < 1 ? contacts : searchResult} 
                deleteHandler={removeContactHandler} 
                term = {searchTerm}
                searchKeyword= {searchHandler}
              />
            )}
          />

          <Route
            path='/contact/:id'
            component = {() => (<ContactDetails/>)}
          />

          <Route
            path='/edit'
            component = {()=>(
              <EditContact 
                updateHandler = {updateContactHandler}
              />
            )}
          />
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
