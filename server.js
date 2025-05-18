import express from 'express'
import bodyParser from 'body-parser'
import _ from 'lodash'
import router from './routes/index.js'
const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

app.use('/', router)
app.listen(PORT, () => {
  console.log(`Server is listening on port : ${PORT}`)
})
