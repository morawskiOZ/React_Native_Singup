import './models/User'
import './models/Track'
import mongoose from 'mongoose'
import express from 'express'
import authRoutes from './routes/authRoutes'
import trackRoutes from './routes/trackRoutes'
import bodyParser from 'body-parser'
import requireAuth from './middleware/requireAuth'

const app = express()

app.use(bodyParser.json())
app.use(authRoutes)
app.use(trackRoutes)

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

mongoose.connection.on('error', err => {
  console.log('error connecting to Mongo', err)
})

app.get('/', requireAuth, (req: any, res) => {
  res.send(`Your email ${req.user.email}`)
})

app.listen(3000, () => {
  console.log('listening')
})
