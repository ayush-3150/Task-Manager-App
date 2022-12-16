const dotEnv = require('dotenv').config()
const cors = require('cors')
const express = require('express')
const taskRoutes = require('./Routes/taskRoutes')
const Task = require('./models/taskModel')

const PORT = process.env.PORT || 5000
const app = express()

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use('/api/tasks', taskRoutes)

//Route
app.get('/', (req, res) => {
  res.send('<h2> home page</h2>')
})

const mongoose = require('mongoose')

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Sever running on PORT no ${PORT}`)
    })
  })
  .catch(err => {
    console.log(err)
  })
