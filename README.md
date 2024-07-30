# Cars Sample Project

## Backend

Base URL: <https://cars.development.ims.cx>  
Hosted Assets: <https://cars.development.ims.cx/assets>

### Endpoints

`POST /login`  
Example Request:

```json
{
  "username": "ims_user",
  "password": "Bad_Passw0rd"
}
```

Example Response:

```json
{
  "success": true,
  "user": {
    "username": "ims_user",
    "token": "eyJUjbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFjY3VzdGFjayIsImRhdGUiOiIyMDIxLTA4LTAxVDExOjImV4cCI6MTYyODQyMTYwNX0.No7lS2Ck1rjk-LCoa0E-sblprDMVG83xznYGUqJLVM8"
  }
}
```

---

`GET /user` (Bearer Auth)  
Example Response:

```json
{
  "username": "ims_user"
}
```

---

`GET /cars` (Bearer Auth)

Query Parameters:

- `search`: search by name or make
- `make`: search by make
- `origin`: search by country of origin (country code)
- `releaseFrom`: starting from specified release year
- `releaseTo`: up to specified release year

Example Response:

```json
{
  "cars": [
    {
      "_id": "61065e22e565b87bb714297f",
      "name": "Hilux",
      "make": "Toyota",
      "release": "1968",
      "origin": "jp",
      "image": "hilux.png"
    },
    {
      "_id": "61065e22e565b87bb7142980",
      "name": "Corolla",
      "make": "Toyota",
      "release": "1966",
      "origin": "jp",
      "image": "corolla.png"
    },
    {
      "_id": "61065e22e565b87bb7142981",
      "name": "Civic",
      "make": "Honda",
      "release": "1972",
      "origin": "jp",
      "image": "civic.png"
    }
  ]
}
```

---

`GET /cars/makes` (Bearer Auth)  
Example Response:

```json
{
  "makes": ["Toyota", "Honda", "Nissan"]
}
```

---

`GET /cars/origins` (Bearer Auth)  
Example Response:

```json
{
  "origins": ["jp", "kr", "de"]
}
```

## Frontend

Demo URL: <https://cars-demo.development.ims.cx>

### Test Account

Username: `ims_user`  
Password: `Bad_Passw0rd`
