/*
me falta entender al 100%
pero este redirecciona a las rutas
*/
const express = require('express');
const app = express();

//config Express
//el contentType que llegue no lo filtrara
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(require('./routes'));

//endpoint health check
app.get('/', (req,res)=>{
    res.send('Hola desde home page');
});

module.exports = app;