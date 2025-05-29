import express from 'express'
import rateLimit from 'express-rate-limit'
import basicAuth from 'express-basic-auth'
import { fileURLToPath } from 'url'
import { readFileSync } from 'fs'
import path from 'path'
import fs from 'fs'
import crypto from 'crypto'

const app = express()
const PORT = 3005

// middlewares
app.use(express.json())

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const apiKeysFilePath = path.join(__dirname, 'apiKey.json')

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
// Helper function / middleware => gets data from the user as query parameter
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

// Set up basic HTTP authentication middleware
const auth = basicAuth({
  // Create an object of users from an array, where each key is a username and its value is the password
  users: users.reduce((acc, user) => {
    acc[user.username] = user.password // Add username-password pair to the accumulator object
    return acc // Return the updated accumulator for the next iteration
  }, {}), // Start with an empty object

  // If authentication fails, browser will prompt for login instead of silently rejecting
  challenge: true
})

/**
 * Middleware to authenticate requests using an API key.
 *
 * Reads the stored API key from the JSON file - apiKey.json and compares it with the
 * 'api-key' header provided in the request. If the key is missing or
 * invalid, responds with 401 Unauthorized and stops further processing.
 * If valid, allows the request to proceed by calling next().
 */

const apiKeyauth = (req, res, next) => {
  const apiKeyFileContent = fs.readFileSync(apiKeysFilePath, 'utf-8') // read as string
  const apiKeyData = JSON.parse(apiKeyFileContent) // parse to JSON

  const apiKey = req.headers['api-key']

  if (!apiKey || apiKey !== apiKeyData.key) {
    return res.status(401).json({ message: 'Unauthorized: Invalid API Key' })
  }
  next()
}

// Routes

// Reads/gets data from simpleData.json
app.get('/getData', allRateLimit, getDataHandler)

// Get data using (auth)
app.get('/getDataWithAuth', auth, getDataHandler)

// Get data using api key
app.get('/getDataWithAPIKEY', apiKeyauth, getDataHandler)

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

// Genereate api-key
app.post('/generateApiKey', (req, res) => {
  const apiKey = crypto.randomBytes(32).toString('hex') // Generate an api key -  completely free on how to generate

  const apiKeyData = {
    key: apiKey,
    generatedAt: new Date().toISOString()
  }
  let apiKeys = []
  apiKeys.push(apiKeyData)
  // Save the key to the database(here apiKey.json)
  fs.writeFileSync('apiKey.json', JSON.stringify(apiKeyData, null, 2))
  res.status(201).json({ apiKey, message: 'API key generated sucessfully' })
})

app.listen(PORT, () => {
  console.log(`Server is listenin on port ${PORT}`)
})
