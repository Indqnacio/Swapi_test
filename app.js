/*
me falta entender al 100%
pero este redirecciona a las rutas
*/
const express = require('express');
const app = express();

const swaggerUI = require('swagger-ui-express');
const swaggerDocumentation = require('./swagger/swagger.js')


//C:\Users\PC\Documents\Practica-React-Js\swapiTest\swagger\swagger.js
//el contentType que llegue no lo filtrara
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(require('./routes'));

//endpoint health check
app.use('/doc',swaggerUI.serve, swaggerUI.setup(swaggerDocumentation));
app.get('/', (req,res)=>{
    res.send('Hola desde home page');
});

module.exports = app;