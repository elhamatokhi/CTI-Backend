import express from 'express'
import bodyParser from 'body-parser'
import { readFileSync } from 'fs'
import _ from 'lodash'
import router from './routes/index.js'
const app = express()
const PORT = 3000

const universitiesJSON = readFileSync('./universities.json', 'utf-8')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

app.use('/', router)
app.listen(PORT, () => {
  console.log(`Server is listening on port : ${PORT}`)
})
