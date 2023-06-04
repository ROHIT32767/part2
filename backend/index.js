const express = require('express')
var morgan = require('morgan')
const cors = require('cors')
app.use(cors())
const app = express()
app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}))
var Persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]
app.use(express.json())
app.get('/api/persons', (req, res) => {
  res.status(200).json(Persons)
})

app.get('/info', (req, res) => {
  const data1 = `Phone Book has info for ${Persons.length} people`
  const data2 = new Date()
  res.status(200).send(`<h4>${data1}</h4><h4>${data2}</h4>`)
})

app.get('/api/persons/:id', (req, res) => {
  const ID = req.params.id
  const current = Persons.filter(element => element.id == ID)
  if (current.length == 1) {
    res.status(200).json(current[0])
  }
  else {
    res.status(404).send(`<h3>Person with id ${ID} not Found in Database</h3>`)
  }

})

app.delete('/api/persons/:id', (req, res) => {
  const ID = req.params.id
  Persons = Persons.filter(element => element.id != ID)
  res.status(204).send()
})

app.post('/api/persons', (req, res) => {
  var obj = req.body
  if (!obj.name || !obj.number) {
    return res.status(404).send(`<h4> Supply all Fields </h4>`)
  }
  if (Persons.map(element => element.name).includes(obj.name)) {
    return res.status(404).send(`<h4> Name msust be unique </h4>`)
  }
  const ID1 = Math.ceil(Math.random() * (1000000))
  Persons = Persons.concat({ id: ID1, ...obj })
  res.status(200).json(Persons)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

