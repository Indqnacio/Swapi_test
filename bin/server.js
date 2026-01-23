/*
Este se conecta con la BD y inicia el servidor
*/

const mongoose = require("mongoose");
const http = require("http");
const app = require("../app");
//import cors from 'cors';
//? Con esto podemos mostrar una tabla con los datos
//const showTable =require('../pruebasTemp/table')

const PORT = 3000;


mongoose
  .connect("mongodb://127.0.0.1:27017/swapiTest")
  .then(() => {
    console.log("MongoDB conectado");
    http.createServer(app).listen(PORT, () => {
      console.log(`Servidor escuchando en puerto ${PORT}`);
    });
  })
  .catch(console.error);