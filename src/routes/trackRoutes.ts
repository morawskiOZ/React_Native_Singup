import express from 'express'
import mongoose from 'mongoose'
import requireAuth from '../middleware/requireAuth'

const Track = mongoose.model('Track')

const router = express.Router()

router.use(requireAuth)

router.get('/tracks', async (req: any, res: any) => {
  const id = req.user._id
  const tracks = await Track.find({ userId: id })
  res.send(tracks)
})

router.post('/tracks', async (req: any, res: any) => {
  const id = req.user._id
  const { name, locations } = req.body
  if (!name || !locations) {
    return res.status(422).send({ error: 'You must provide name and location' })
  }
  try {
    const track = new Track({ name, locations, userId: id })
    await track.save()
    res.send(track)
  } catch (err) {
    res.status(422).send({ error: err.message })
  }
})

export default router
