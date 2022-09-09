import './App.css';
import contacts from './contacts.json'
import React, { useState } from 'react'

const contactsToDisplay = contacts.slice(0, 5)
  
  function App() {
    const [contactsList, setContactsList] = useState(contactsToDisplay)

    const findRandomContact = () => {
      if (contactsList.length < contacts.length) {
        const randomContact = contacts[Math.floor(Math.random() * (contacts.length - 5) + 5)]
        if (!contactsList.includes(randomContact)) {
          return setContactsList([...contactsList, randomContact])
        } else { findRandomContact()} 
      }
    }

    const sortByName = () => {
      const sortedList = [...contactsList].sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
      })
      setContactsList(sortedList)
    }

    const sortByPopularity = () => {
      const sortedList = [...contactsList].sort((a, b) => b.popularity - a.popularity)
      setContactsList(sortedList)
    }

    const deleteContact = (contactId) => {
      const filteredContacts = contactsList.filter(contact => contact.id !== contactId)
      setContactsList(filteredContacts)
    }

    return (
      <div className="App">
    <h1>IronContacts</h1>
    <button onClick={findRandomContact}>Add Random Contact</button>
    <button onClick={sortByName}>Sort by name</button>
    <button onClick={sortByPopularity}>Sort by popularity</button>
    <table>
      <thead>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won Oscar</th>
          <th>Won Emmy</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {contactsList.map(contact => {
          return (
            <tr key = {contact.id}>
              <td><img src={contact.pictureUrl}/></td>
              <td>{contact.name}</td>
              <td>{contact.popularity.toFixed(2)}</td>
              {contact.wonOscar ? <td>🏆</td> : <td></td>}
              {contact.wonEmmy ? <td>🏆</td> : <td></td>}
              <td><button onClick={() => deleteContact(contact.id)}>Delete</button></td>
            </tr>
          )})}
      </tbody>
    </table>
    </div>
  );
}

export default App;
