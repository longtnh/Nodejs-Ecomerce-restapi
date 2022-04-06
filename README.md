# Description
NodeJS E-Commerce RestAPI
  - NodeJS
  - ExpressJS
  - MongoDB (Mongoose)
  - JWT (jsonwebtoken)
  - Upload File (Multer)
  - PassportJS (Local login, Google login)
  - Send Email verify (Nodemailer)
# Installation
`npm install`
# Running the app
`npm run start`
# Note
Create file ".env" and add environment variables to .env file like this
```
MONGO_URL = <YOUR_MONGODB_URL>
SECRET_KEY = <YOUR_SECRET_KEY>
JWT_SECRET_KEY = <YOUR_JWT_SECRET_KEY>
TOKEN_MAIL = <YOUR_TOKEN_MAIL>

GOOGLE_CLIENT_ID = <YOUR_GOOGLE_CLIENT_ID>
GOOGLE_CLIENT_SECRET = <YOUR_GOOGLE_CLIENT_ID>
GOOGLE_CALLBACK_URL = http://localhost:5000/api/auth/google/callback

ADMIN_EMAIL = <YOUR_ADMIN_EMAIL>
ADMIN_PASSWORD = <YOUR_ADMIN_EMAIL>
```
ADMIN_EMAIL and ADMIN_PASSWORD is email and password will send email
