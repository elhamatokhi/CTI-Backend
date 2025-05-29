# 📦 Simple Express API with Authentication

This project sets up a basic Express.js server that serves paginated data from a local JSON file. It includes basic HTTP authentication to protect the /getData endpoint.

🔐 Authentication
The server uses Basic Authentication via express-basic-auth. Only users with valid usernames and passwords can access the data endpoint.

## 💡 Key Features

👥 User Registration with username and password saved locally in `users.json`

🔐 Multiple Authentication Methods:
 • Basic Auth with registered users
 • API Key Auth using keys from `apiKey.json`
 • JWT Auth for secure token-based access

⏳ Rate Limiting: 1 request per minute on `/getData` route to prevent abuse

📄 Paginated Data Endpoint: fetch 5 items per page from `simpleData.json`

🔑 Secure Endpoints to Generate API Keys and JWT Tokens for clients

🛡️ JWT Tokens signed and verified using a secret key for secure session management

---

🚀 Getting Started

Install dependencies:

```
bash

npm install express express-basic-auth

```

Run the server:

```
bash

node index.js
```

Access data:
Visit http://localhost:3005/getData?page=1 in your browser or use a tool like Postman, providing the correct username and password.
