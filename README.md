# URL Shortener API

A URL shortener backend built with NestJS, MongoDB, and Mongoose.

## 🔧 Features
- Shorten URLs (with optional custom short codes)
- Redirect using short URLs
- Track click analytics
- Authentication with JWT
- Swagger documentation
- Rate limiting (optional)
- Docker support

## 🧪 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/auth/register` | Register a new user |
| POST   | `/auth/login`    | Log in and get JWT |
| POST   | `/api/shorten`   | Shorten a URL (auth required) |
| GET    | `/r/:shortCode`  | Redirect to original URL |
| GET    | `/api/stats/:shortCode` | Get analytics (auth required) |

## 🛠 Setup Instructions

### 1. Clone & Install
```bash
git clone <https://github.com/Ashutosh-koli/shortener-url-task>
cd shortener-url-task
npm install
cp .env.example .env
```

### 2. Run Locally
```bash
npm run start:dev
```

### 3. Run with Docker
```bash
docker-compose up --build
```

### 4. Swagger Docs
Visit: [http://localhost:3000/docs](http://localhost:3000/docs)

## 🔐 Auth
Send JWT token in header:
```
Authorization: Bearer <token>
```

## 📦 Tech Stack
- NestJS
- MongoDB + Mongoose
- JWT Auth
- Swagger
- Docker


