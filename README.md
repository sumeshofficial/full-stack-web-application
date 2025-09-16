# Fullstack User & Admin Authentication App
A simple Node.js fullstack application with user login/register and admin login/dashboard, using EJS templating, Bootstrap styling, and bcrypt for password hashing.

## Features

- User registration and login with session-based authentication

- Passwords are hashed using bcrypt for security

- Admin login with email only and session management

- Protected routes for admin and users

- Responsive UI with Bootstrap

- Logout functionality

- Clear error messages for invalid login or signup

## Technologies Used

- Node.js

- Express.js

- MongoDB & Mongoose

- EJS

- Bootstrap

- express-session

- bcrypt

- dotenv

## Getting Started

## Prerequisites

- Node.js installed

- npm installed

- MongoDB running locally or Atlas

### Installation

Clone the repository:

```bash
git clone https://github.com/sumeshofficial/full-stack-web-application.git
cd full-stack-web-application
```

Install dependencies:
```bash
npm install
```

Create a `.env` file in the project root with placeholder variables:
```
PORT="your_port_number"
MONGODB_URI="your_mongodb_connection_string"
ADMIN_EMAIL="your_admin_email"
SESSION_KEY="your_secret_key"
ADMIN_PASSWORD="your_admin_password"
```
Replace the placeholders with your actual credentials and connection string.


### Running the App

Start the server:

```bash
npm start
```

Open your browser and visit:


http://localhost:PORT

### Project Structure

```bash
full-stack-web-application/
├── app.js             # Main app entry point  
├── models/            # Mongoose models for User  
├── routes/            # Express routes for user & admin  
├── controllers/       # Route handlers  
├── views/             # EJS templates  
│   ├── layouts/       # Layout files  
│   ├── partials/      # Navbar, footer, etc.  
│   ├── user/          # User pages (login, register)  
│   └── admin/         # Admin pages (login, dashboard)  
├── public/            # Static files (CSS, JS)  
├── middleware/        # Auth middleware  
├── .env               # Environment variables (not committed)  
└── README.md
```

Security Note

1. Passwords are hashed with bcrypt before storing in MongoDB.
2. Do not commit your .env file to GitHub.
3. Make sure .env is included in .gitignore to keep your credentials safe.

License

This project is open source under the MIT License.
