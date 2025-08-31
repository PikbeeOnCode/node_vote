# Node Vote
![Node.js](https://img.shields.io/badge/node-%3E%3D16-green) 
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

A lightweight backend for a voting system built with **Node.js**, **Express**, **MongoDB**, and **JWT authentication**.

---

## 📌 Table of Contents

- [Overview](#overview)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Setup & Installation](#setup--installation)  
- [Usage](#usage)  
- [API Endpoints](#api-endpoints)  
- [Configuration](#configuration)  
- [Project Structure](#project-structure)  
- [Future Improvements](#future-improvements)  
- [Contributing](#contributing)  
- [License](#license)

---

## 📖 Overview

**Node Vote** is a simple REST API application that allows users to register, log in, and vote for candidates in an authenticated environment.  

This project is a great starting point for understanding how authentication, database integration, and protected routes work in a real-world backend system.

---

## ✨ Features

- 🔑 **User Authentication** with JWT  
- 🗳️ **Vote Casting** (one user can vote once per candidate)  
- 👤 **Candidate Lookup** via ID  
- 🔒 **Protected Routes** (only logged-in users can vote)  
- ⚡ Built with **Express.js** for routing and middleware  
- 🗄️ **MongoDB** integration via Mongoose  

---

## 🛠 Tech Stack

| Component       | Technology            |
|-----------------|------------------------|
| Server          | Node.js with Express   |
| Database        | MongoDB (Mongoose)     |
| Authentication  | JWT                    |
| Config          | Environment Variables  |

---

## 🚀 Setup & Installation

1. **Clone the repo:**
   ```bash
   git clone https://github.com/PikbeeOnCode/node_vote.git
   cd node_vote
Install dependencies:

bash
Copy code
npm install
Create a .env file in the root:

env
Copy code
PORT=3000
DATABASE_URL=<your_mongo_connection_string>
JWT_SECRET=<your_jwt_secret>
Start the server:

bash
Copy code
npm start
or for development with auto-reload:

bash
Copy code
npm run dev
📡 Usage
Register/Login to get a JWT token.

Use the token in the Authorization header to access protected routes.

Example:

http
Copy code
POST /vote/:candidateId
Authorization: Bearer <your_token>
📑 API Endpoints
Endpoint	Method	Description	Auth Required
/users/register	POST	Register a new user	No
/users/login	POST	User login → returns JWT token	No
/vote/:candidateId	POST	Cast a vote for a candidate	Yes
/candidates/:candidateId	GET	Get candidate details	No

⚙️ Configuration
Environment variables required:

PORT → App running port (default: 3000)

DATABASE_URL → MongoDB connection string

JWT_SECRET → Secret key for signing tokens

📂 Project Structure
pgsql
Copy code
node_vote/
├── models/          → Mongoose schemas (User, Candidate, Vote)
├── routes/          → Express routes (auth, vote, candidates)
├── db.js            → Database connection logic
├── jwt.js           → JWT authentication middleware
├── server.js        → Main app entry
├── planning.txt     → Notes and planning
└── README.md        → Project documentation
🔮 Future Improvements
Add vote history and poll creation

Rebuild using SQL (PostgreSQL/MySQL) for relational DB practice

Add real-time voting results

Switch to TypeScript for type safety

Deploy to Heroku, Vercel, or Railway

🤝 Contributing
Contributions are welcome!

Open an issue to suggest new features or report bugs.

Fork the repo, make changes, and submit a pull request.

📜 License
Licensed under the MIT License.

yaml
Copy code

---

👉 Just drop this into your repo as `README.md`.  
Do you want me to also generate a **MIT LICENSE file** so it matches the README?
