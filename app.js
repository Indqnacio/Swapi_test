const express = require('express');

const app = express();

//config Express
//el contentType que llegue no lo filtrara
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', (req,res)=>{
    res.send('Todo Ok, funciona');
});

module.exports = app;