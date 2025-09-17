steps to run at your local machine

clone the code at your local system
run command inside task-managemnt derectory -> npm i
add your env and db related values .into env file
run storeProcedure.js file query into your pgsql to create store procedure and after that you can use it where you want


project structure

task-management/
├── src/
│   ├── config/
│   │   └── database.js
│   │   └── redis.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── user.routes.js
│   ├── controllers/
│   │   └── user.controller.js
│   └── index.js
├── .env
├── package.json

api curls :
/ register api : 

curl --location 'http://localhost:3000/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username" :"muskan123",
    "email" : "muskan@gmail.com",
    "password" : "muskan@123"
}'

