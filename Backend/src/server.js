import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { json, urlencoded } from 'body-parser'
import itemRoute from './resources/item/route'
import { connect } from './uttils/db'
import { signin, signup, protectedPath } from './uttils/auth'
import config from './config'

export const app = express()
app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(morgan('dev'))
app.use(urlencoded({ extended: true }))

const firstMiddleware = (req, res, next) => {
  next()
}

app.post('/api/signup', signup)
app.post('/api/signin', signin)
app.use('/api/user-notes', protectedPath, itemRoute)

// Whenever there is anyhting use prefix api use router middleware

app.get('/', (req, res, next) => {
  res.send({ message: 'Hello wWorld!' })
})

app.post('/', firstMiddleware, (req, res) => {
  console.log(req.body)
  res.send(req.body)
  // res.send({ message: 'Ok' })
})

export const start = async () => {
  const mongoUrl = ''
  await connect(mongoUrl)
  app.listen(process.env.PORT || 5000, () => {
    console.log(`server is running at ${process.env.PORT}`)
  })
  // app.listen(config.port, () => {
  //   console.log(`Server is running`)
  // })
}
