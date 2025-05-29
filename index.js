import express from 'express'
import rateLimit from 'express-rate-limit'
import expressBasicAuth from 'express-basic-auth'
import { fileURLToPath } from 'url'
import { readFileSync, stat } from 'fs'
import path, { resolve } from 'path'
import fs from 'fs'

const app = express()
const PORT = 3005

// middlewares
app.use(express.json())

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const jsonData = JSON.parse(
  readFileSync(path.join(__dirname, 'simpleData.json'), 'utf-8') // readFileSync returns a string, so you need to parse it
)

// Read users from users.json
const usersFilePath = 'users.json'
let users = []
if (fs.existsSync(usersFilePath)) {
  try {
    const userData = fs.readFileSync(usersFilePath, 'utf-8')
    users = JSON.parse(userData)
  } catch (error) {
    console.log('Error reading or parsing users data.')
  }
}
// Write users to users.json

function writeUsersToFile (users) {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2))
}
// Helper function => gets data from the user as query parameter
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
// Set rate limit
const allRateLimit = rateLimit({
  windowMs: 60 * 1000,
  max: 1,
  message: 'Too many requests from this IP, please try again later.'
})

// Routes
// Reads data from simpleData.json
app.get('/getData', allRateLimit, getDataHandler)

// Creates username and password
app.post('/registerUser', (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    res.status(400).json({ message: 'Username or password is  missing!' })
  }

  if (users.some(user => user.username === username)) {
    return res.status(400).json({ message: 'Username already exists!' })
  }
  users.push({ username, password })
  writeUsersToFile(users)
  return res.status(200).json({ message: 'User registered successfully! 🎉 ' })
})

app.listen(PORT, () => {
  console.log(`Server is listenin on port ${PORT}`)
})
