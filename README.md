# CREDIT CARD VALIDATOR

Monorepo project with backend and frontend

## BACKEND

Nest.js app with validators, controller and service.

Test controller with jest

## FRONTEND

Vite React app with fetch service

Testing with vitest and react testing library

### INSTALLATION STEPS

Using node v21+ and npm v10+ run the following commands in project's root:

`npm i`

`npm run concurrently`

If port available frontend will be running at [http://localhost:5173](http://localhost:5173) 

If port available backend will be running at [http://localhost:3000](http://localhost:3000)

### Valid credit card example request

Request:

```
POST http://localhost:3000/api/v1/validate/cc
Content-Type: application/json

{
  "creditCard": "4485275742308327"
}
```

Response:
```
HTTP/1.1 200 OK

{
    "creditCard": "4485275742308327",
    "isValid": true
}
```

### Invalid credit card example request

Request:

```
POST http://localhost:3000/api/v1/validate/cc
Content-Type: application/json

{
  "creditCard": "4485275742308328"
}
```

Response:
```
HTTP/1.1 200 OK

{
  "creditCard": "4485275742308328",
  "isValid": false
}
```

### Invalid credit card payload example request

Request:

```
POST http://localhost:3000/api/v1/validate/cc
Content-Type: application/json

{}
```

Response:
```
HTTP/1.1 400 Bad Request

{
  "message": [
    "creditCard must be shorter than or equal to 16 characters",
    "creditCard must be longer than or equal to 16 characters",
    "creditCard must be a string",
    "creditCard should not be empty"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
```