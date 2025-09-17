const express = require("express");
const app= express();
const cors = require("cors");
const bodyParser = require("body-parser")
require('dotenv').config();


const sequelize = require("./config/database")

const signInRoute = require("./routes/signInRoute")
const projectRoutes = require("./routes/projectRoute")
const taskRoute = require("./routes/task")
const authMiddleware = require("./auth-middleware/auth")

app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}))

app.use(express.json());

app.use(signInRoute);
app.use('/api/projects', authMiddleware, projectRoutes);
app.use('/api/tasks', authMiddleware, taskRoute);


// const PORT = 3000;

async function start() {
        console.log('Postgres connected');
  try {
    await sequelize.authenticate();
    console.log('Postgres connected');

    await sequelize.sync({ alter: true });  // Creates tables if not exists

    app.listen(3000, () => {
      console.log(`Server running at http://localhost:${3000}`);
    });
  } catch (err) {
    console.error('Unable to start server:', err);
  }
}

start();