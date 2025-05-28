import express from 'express'
import rateLimit from 'express-rate-limit'
import expressBasicAuth from 'express-basic-auth'
import { fileURLToPath } from 'url'
import { readFileSync, stat } from 'fs'
import path, { resolve } from 'path'
import { get } from 'http'
import { start } from 'repl'

const app = express()
const PORT = 3005

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const jsonData = JSON.parse(
  readFileSync(path.join(__dirname, 'simpleData.json'), 'utf-8')
)

// readFileSync returns a string, so you need to parse it

app.use(express.json())

const getDataHandler = (req, res) => {
  const { page } = req.query
  const pageNumber = parseInt(page) || 1
  const pageSize = 5 // # of elements sent to user
  const startIndex = (pageNumber - 1) * pageSize
  const endIndex = startIndex + pageSize
  const responseData = {
    data: jsonData.data.slice(startIndex, endIndex)
  }

  res.json(responseData)
}

app.get('/getData', getDataHandler)

app.listen(PORT, () => {
  console.log(`Server is listenin on port ${PORT}`)
})
