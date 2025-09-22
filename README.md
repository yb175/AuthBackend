# AuthBackend

Express.js backend for user authentication using JWT.  
Provides APIs for user registration, OTP verification, login (with JWT issuance), and protected data access.  
Parses JSON, handles cookies, connects to MongoDB, and manages stateless sessions securely.

## ✨ Features

- User Registration with OTP Verification  
- JWT-based Authentication  
- Protected Data Access  
- MongoDB Integration for User & OTP Storage  

## 💻 Tech Stack

- **Node.js** – JavaScript runtime for backend development  
- **Express** – Minimalist web framework  
- **MongoDB** – NoSQL database for storing users and OTPs  
- **JSON Web Tokens (JWT)** – Secure stateless authentication  

## 📂 Project Structure

```
.
├── .gitignore
├── README.md
├── Readme2.md
├── controllers
│   ├── createUser.js
│   ├── getdata.js
│   ├── login.js
│   ├── sendOtp.js
│   └── verifyOtp.js
├── db
│   ├── db.js
│   └── schema
│   ├── otpSchema.js
│   └── userSchema.js
├── middleware
│   └── userAuth.js
├── package-lock.json
├── package.json
├── routes
│   ├── auth.js
│   └── user.js
├── server.js
└── utils
    └── validator.js
```
## 🚀 Getting Started

### Installation

```bash
npm install
````

### Running the Application

```bash
npm start
```

---

## 📡 API Endpoints

---

### ✅ POST `/auth/createUser`

**Purpose:**
Start user registration by validating input data and sending an OTP.

**Request Body:**

```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "age": "number",
  "gender": "string"
}
```

**Responses:**

* `200 OK`: OTP sent successfully
* `400 Bad Request`: Validation error message
* `500 Internal Server Error`

---

### ✅ POST `/auth/verifyOtp`

**Purpose:**
Verify the OTP and create the user account.

**Request Body:**

```json
{
  "email": "string",
  "otp": "string",
  "password": "string",
  "prefrence": "string"
}
```

**Responses:**

* `200 OK`:

  ```json
  { "message": "User created successfully" }
  ```
* `400 Bad Request`:

  ```json
  { "message": "Otp not found" }  
  OR  
  { "message": "Invalid Otp" }
  ```

---

### ✅ POST `/user/login`

**Purpose:**
Authenticate user and issue a JWT stored in HTTP-only cookies.

**Request Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

**Responses:**

* `200 OK`: "login success"
* `500 Internal Server Error`:

  ```json
  { "err": "User not found" }  
  OR  
  { "err": "Invalid credentials" }
  ```

---

### ✅ GET `/user/getdata`

**Purpose:**
Access protected route by sending the cookie (with JWT token).

**Request Headers:**

* Cookies (must include `token` set during login)

**Responses:**

* `200 OK`:

  ```json
  {
    "token": "string"
  }
  ```
* `500 Internal Server Error`:

  ```json
  { "err": "Error message" }
  ```

---

## ⚙️ Sample `.env` File

```ini
GMAILID=your-email@gmail.com
PASSWORD=your-gmail-app-password
jwt_key=your_super_secret_jwt_key
```

👉 Example:

```ini
GMAILID=myapp@gmail.com  
PASSWORD=abc123app-password  
jwt_key=supersecretjwtkey123
```

> ⚡ Tip:
> Use [App Passwords](https://support.google.com/accounts/answer/185833) for Gmail instead of your normal password.
> Keep `jwt_key` secure to protect your JWT.

---


## 📜 License
```
MIT
```



