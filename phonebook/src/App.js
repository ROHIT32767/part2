import { useState, useEffect } from 'react'
import Filter from "./components/Filter.js"
import PersonForm from "./components/PersonForm.js"
import Persons from "./components/Persons.js"
import axios from 'axios'
import PersonService from "./services/Persons"
const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div>
      <div className='error'>
        {message}
      </div>
    </div>
  )
}
const App = () => {
  const [persons, setPersons] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  const [newName, setNewName] = useState('')
  const [newNumber, setnewNumber] = useState('')
  const [newSearch, setnewSearch] = useState('')
  function handleChange(event) {
    setNewName(event.target.value)
  }
  function handleSubmit(event) {
    event.preventDefault()
    const values = Object.values(persons).map(element => element.name)
    if (values.includes(newName.trimEnd())) {
      if (window.confirm(`${newName} is already added to phonebook , replace the old number with the new number`)) {
        const obj = Object.entries(persons).filter(element => element[1].name === newName)
        const newobj = { ...obj[0][1], number: newNumber }
        console.log(newobj)
        PersonService.update(newobj.id, newobj).then(response => {
          setPersons(prevPerson => prevPerson.id === newobj.id ? newobj : prevPerson)
          setNewName('')
          setnewNumber('')
        }).catch(error => {
          setErrorMessage(
            `Information of ${newName} has already been removed from Server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
      }
      else {
        setNewName('')
        setnewNumber('')
      }
    }
    else {
      const y = {
        name: newName.trimEnd(),
        number: newNumber
      }
      PersonService
        .create(y)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setnewNumber('')
          setErrorMessage(
            `Added '${y.name}`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }
  function handleNumber(event) {
    setnewNumber(event.target.value)
  }
  function handleSearch(event) {
    setnewSearch(event.target.value)
  }
  function DeleteNumber(id) {
    PersonService.Delete(id).then(returnedPerson => setPersons(persons.filter(element => element.id !== id)))
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter newSearch={newSearch} handleSearch={handleSearch} />
      <PersonForm handleSubmit={handleSubmit} newName={newName} handleChange={handleChange} newNumber={newNumber} handleNumber={handleNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} newSearch={newSearch} DeleteNumber={(id) => DeleteNumber(id)} />
    </div>
  )

}

export default App