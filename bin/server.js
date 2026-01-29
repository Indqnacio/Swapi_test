require('dotenv').config();

const mongoose = require("mongoose");
const http = require("http");
const app = require("../app");

const { seedAll } = require("./swapi/swapi.seed");

const port = process.env.PORT || 3000;
const nameDatabase = process.env.NAMEBD || "swapiTest"
mongoose
  .connect("mongodb://127.0.0.1:27017/"+ nameDatabase)
  .then(async () => {
    console.log("MongoDB conectado");

    try {
      await seedAll();
    } catch (err) {
      console.error("Error en al traer la info:", err.message || err);
    }

    http.createServer(app).listen(port, () => {
      console.log(`Servidor escuchando en puerto ${port}`);
    });
  })
  .catch(console.error);