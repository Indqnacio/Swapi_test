require('dotenv').config();

const mongoose = require("mongoose");
const http = require("http");
const app = require("../app");

const { seedPlanets } = require("./swapi/swapi.seed");

const port = process.env.PORT || 3000;

mongoose
  .connect("mongodb://127.0.0.1:27017/swapiTest")
  .then(async () => {
    console.log("MongoDB conectado");

    try {
      await seedPlanets();
    } catch (err) {
      console.error("Error en seedPlanets:", err.message || err);
    }

    http.createServer(app).listen(port, () => {
      console.log(`Servidor escuchando en puerto ${port}`);
    });
  })
  .catch(console.error);