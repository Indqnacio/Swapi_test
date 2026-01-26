// Este se conecta con la BD y inicia el servidor
require('dotenv').config();

const mongoose = require("mongoose");
const http = require("http");
const app = require("../app");
//import cors from 'cors';
//? Con esto podemos mostrar una tabla con los datos
//const showTable =require('../pruebasTemp/table')

const port = process.env.PORT || 3000;

mongoose
  .connect("mongodb://127.0.0.1:27017/swapiTest")
  .then(() => {
    console.log("MongoDB conectado");
    http.createServer(app).listen(port, () => {
      console.log(`Servidor escuchando en puerto ${port}`);
    });
  })
  .catch(console.error);