# 📦 Simple Express API with Authentication

This project sets up a basic Express.js server that serves paginated data from a local JSON file. It includes basic HTTP authentication to protect the /getData endpoint.

🔐 Authentication
The server uses Basic Authentication via express-basic-auth. Only users with valid usernames and passwords can access the data endpoint.

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
