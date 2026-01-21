const mongoose = require('mongoose');
const http = require('http');
const app = require('../app');

const server = http.createServer(app);

server.listen(3000);

server.on('listening', ()=>{
    console.log('El servidor esta escuchando en el puerto 3000')
})

mongoose.connect('mongodb://127.0.0.1:27017/swapi')
.then(()=> {
    console.log('MongoDB conectado');
    app.listen(3000, () => {
      console.log('Servidor levantado');
    });
  })
  .catch(err => console.error(err));
