require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const customerRoutes = require('./routes/customer')
const userRoutes = require('./routes/user')
const cors = require('cors')

// express app
const app = express()

// middleware
app.use(express.json())
app.use(cors())


app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/user', userRoutes)
app.use('/api/customers', customerRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(4000, () => {
      console.log('connected to db & listening on port', 4000)
    })
  })
  .catch((error) => {
    console.log(error)
  })