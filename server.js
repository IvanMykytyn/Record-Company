const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()

// db
const client = require('./db/connection.js')

// routes
const { albumRouter, bandRouter, songRouter } = require('./routes/index')

app.use(express.json())


app.use('/albums', albumRouter)
app.use('/bands', bandRouter)
app.use('/songs', songRouter)


const port = process.env.PORT || 5000

const start = async () => {
  try {
    client.connect()
    await app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
