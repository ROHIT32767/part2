import { useState,useEffect } from 'react'
import Filter from "./components/Filter.js"
import Persons from "./components/Persons.js"
import axios from 'axios'
const App = () => {
  const [countries, setCountries] = useState([])
  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      }) 
  }, [])
  const [newSearch,setnewSearch]=useState('')
  function handleSearch(event)
  {
    setnewSearch(event.target.value)
  }
  return (
    <div>
      <h2>Countries</h2>
      <Filter newSearch={newSearch} handleSearch={handleSearch} />
      <Persons persons={countries} newSearch={newSearch} />
    </div>
  )

}

export default App