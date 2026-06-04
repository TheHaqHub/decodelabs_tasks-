# Project 2 — User Management API

A RESTful User Management API built with Node.js and Express.

## Setup

```bash
npm install
npm start
```

Server runs on: http://localhost:3000

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /users | Get all users |
| GET | /users/:id | Get user by ID |
| POST | /users | Create new user |
| PUT | /users/:id | Update user |
| DELETE | /users/:id | Delete user |

## Example Requests

### Create a user
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Ali","email":"ali@example.com","age":22}'
```

### Get all users
```bash
curl http://localhost:3000/users
```

### Update a user
```bash
curl -X PUT http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Ali Khan","email":"ali@example.com","age":23}'
```

### Delete a user
```bash
curl -X DELETE http://localhost:3000/users/1
```

## Status Codes
- 200 — OK
- 201 — Created
- 204 — Deleted
- 400 — Bad Request
- 404 — Not Found
- 409 — Conflict (duplicate email)
- 500 — Internal Server Error