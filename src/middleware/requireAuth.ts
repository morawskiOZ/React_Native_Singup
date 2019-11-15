import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

const User = mongoose.model('User')

export default (req: any, res: any, next: any) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).send({ error: 'You must be logged in.' })
  }

  const token = authorization.replace('Bearer ', '')
  jwt.verify(token, '1234', async (error: any, payload: any) => {
    if (error) {
      return res.status(401).send({ error: 'You must be logged in.' })
    }
    const { userId } = payload
    const user = await User.findById(userId)
    req.user = user
    next()
  })
}
