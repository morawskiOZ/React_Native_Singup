import express from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

const User = mongoose.model('User')

const router = express.Router()

router.post('/signup', async (req, res) => {
  const { email, password } = req.body
  try {
    const user = new User({ email, password })
    await user.save()
    const token = jwt.sign({ userId: user._id }, '1234')
    res.send({ token })
  } catch (err) {
    return res.status(422).send(err.message)
  }
})

router.post('/signin', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(422).send({ error: 'Must provide email and password' })
  }

  const user: any = await User.findOne({ email })

  if (!user) {
    return res.status(422).send({ error: 'Invalid password or email' })
  }

  try {
    await user.comparePassword(password)
    const token = jwt.sign({ userId: user._id }, '1234')
    res.send({ token })
  } catch (err) {
    return res.status(422).send({ error: 'Invalid password or email' })
  }
})

export default router
