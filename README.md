# RESTBestPractices
Repository with REST architecture style best practice examples

# Pre-setup
1) Install nodejs and npm;
2) Install globally knex - ``npm install knex -g``;
3) Install globally postgresql and create database - ``CREATE DATABASE restbestpractices;``;

# Authorization
1) Install all dependencies - ``npm install``;
2) Change DB credentials in knexfile.js;
3) Execute command - ``knex migrate:latest``;
4) Start the server - ``npm start``;
5) Create an account and POST it to localhost:3000/registration via postman or similar -
```
{
	"name": "Name",
	"surname": "Surname",
	"email": "user@email.com",
	"password": "SuperSecretPassword"
}
```
6) Do a POST to localhost:3000/login with the same email and password and retrieve token;
7) Try to access urls localhost:3000/users/safe and localhost:3000/users/unsafe without passing ``Authorization`` header;
8) Try to access urls localhost:3000/users/safe and localhost:3000/users/unsafe with passing ``Authorization`` header (with token that was retrieved using login).

# CSRF
1) Install all dependencies - ``npm install``;
2) Start the server - ``npm start``;
3) Try to POST without CSRF token to localhost:3000/safe.
4) Try to post without CSRF token to localhost:3000/unsafe.
5) Get CSRF token from localhost:3000/token;
6) Try to post with CSRF token to localhost:3000/safe -
```
{
	"_csrf": "token from localhost:3000/token"
}
```

# Anti-Farming
1) Install all dependencies - ``npm install``;
2) Change DB credentials in knexfile.js;
3) Execute command - ``knex migrate:latest``;
4) Start the server - ``npm start``;
5) Try to make GET requests to localhost:3000/safe , you should see counter increasing, when it will reach 15, you will see rejection message. Only last minute requests will be taken into an account.