import config from '../config'
import { UserSchema } from '../resources/user/user.model'
import jwt from 'jsonwebtoken'

export const newToken = (user) => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp,
  })
}

export const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) reject(err)
      resolve(payload)
    })
  })
}

export const signup = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send({ message: 'Email and Password Required' })
  }
  try {
    const user = await UserSchema.create(req.body)
    const token = newToken(user)
    res.status(201).send({ token })
  } catch (error) {
    console.error(error)
    res.status(400).end(error)
  }
}

export const signin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send({ message: 'Email and Password Required' })
  }
  const user = await UserSchema.findOne({ email: req.body.email })
    .select('-password')
    .exec()
  if (!user) {
    res.status(400).end()
  }

  try {
    const match = user.checkPassword(req.body.password)
    if (!match) {
      res.status(401).send({ message: 'Invalid Password' })
    }
    const token = newToken(user)
    res.status(201).json({ token, user })
  } catch (error) {
    res.status(400).end()
  }
}

export const protectedPath = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: 'No Auth' })
  }
  let token = req.headers.authorization.split('Bearer ')[1]
  if (!token) {
    return res.status(401).send({ message: 'No Auth' })
  }
  try {
    const payload = await verifyToken(token)
    const user = await UserSchema.findById(payload.id)
      .select('-password')
      .exec()
    req.user = user
    next()
  } catch (error) {
    res.status(401).send({ message: 'Not Authorized' })
  }
}
