import mongoose from 'mongoose'

const pointSchema = new mongoose.Schema({
  timestamp: Number,
  coords: {
    latitude: Number,
    longitude: Number,
    altitude: Number,
    accuracy: Number,
    heading: Number,
    speed: Number,
    altitudeAccuracy: Number
  },
  mocked: Boolean
})

const trackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    default: ''
  },
  locations: [pointSchema]
})

export default mongoose.model('Track', trackSchema)
