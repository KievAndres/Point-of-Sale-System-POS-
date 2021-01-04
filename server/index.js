const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db')

//middleware
app.use(cors())
app.use(express.json())

// Routes
//Create a client
app.post('/client', async (req, res) => {
  try {
    const { idClient, fullName, creationDate, reference } = req.body
    const newClient =
      await pool.query(
        'INSERT INTO Clients (idClient, fullName, creationDate, reference) VALUES ($1, $2, $3, $4) RETURNING *',
        [idClient, fullName, creationDate, reference]);
    res.json(newClient.rows[0])
  } catch (err) {
    console.error(err)
  }
})

//Get all clients
app.get('/clients', async (req, res) => {
  try {
    const allClients = await pool.query('SELECT * FROM Clients');
    res.json(allClients.rows)
  } catch (err) {
    console.error(err)
  }
})

//Get a client
app.get('/clients/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const getClientX = await pool.query('SELECT * FROM Clients WHERE idClient = $1', [id])
    res.json(getClientX.rows[0])
  } catch (err) {
    console.error(err)
  }
})

//Update a Client
app.put('/clients/:id', async (req, res) => {
  try{
    const { id } = req.params
    const { fullName } = req.body
    // const updateClient = await pool.query('UPDATE Client SET fullName = $1 WHERE idClient = $2', [fullName, id])
    // res.json('The client was updated')
  } catch (err) {
    console.error(err)
  }
})

app.listen(5000, () => {
  console.log('Server has started on port 5000')
})