import './models/User'
import mongoose from 'mongoose'
import express from 'express'
import authRoutes from './routes/authRoutes'
import bodyParser from 'body-parser'
import requireAuth from './middleware/requireAuth'

const app = express()

app.use(bodyParser.json())
app.use(authRoutes)

const mongoUri =
  'mongodb+srv://piotrmorawski:1234@cluster0-mr6m6.gcp.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true 
})

mongoose.connection.on('connected', () => {
  console.log('connected to Mongo')
})

mongoose.connection.on('error', (err) => {
  console.log('error connecting to Mongo', err)
})

app.get('/', requireAuth, (req, res) => {
  res.send('Hi there')
})

app.listen(3000, () => {
  console.log('listening')
})
