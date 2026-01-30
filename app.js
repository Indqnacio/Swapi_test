//? libs para documentacion
const swaggerDocumentation = require('./swagger/swagger.js')
const swaggerUI = require('swagger-ui-express');
//? libs basicas
const express = require('express');
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors({
  origin: "http://localhost:5173"
}));
//app.options("*", cors());

//usar cualquier localhost
//app.use(cors());

app.use(require('./routes'));



//endpoint health check
app.use('/doc',swaggerUI.serve, swaggerUI.setup(swaggerDocumentation));
app.get('/', (req,res)=>{
    res.send('Hola desde home page');
});

module.exports = app;