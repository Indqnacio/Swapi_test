const swaggerJsdoc = require("swagger-jsdoc"); //swaggerJsdoc from 'swagger-jsdoc';
require("dotenv").config();

const outputFile = "./swagger.json";
const endPointsFiles = [
  "./routes/api/index.js",
  "./routes/api/specie.route.js",
  "./routes/api/character.route.js",
  "./routes/api/film.route.js",
  "./routes/api/planet.route.js",
  "./routes/api/starship.route.js",
  "./routes/api/vehicles.route.js",
];

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Starwars API",
      version: "1.0.0",
      description: "API de Star Wars La informacion viene directamente de la API : \r\n- [Home Swapi](https://swapi.info/) \r\n - [EndPoint Personajes](https://swapi.info/people) \n - [EndPoint Peliculas](https://swapi.info/films) \n - [EndPoint Planetas](https://swapi.info/planets) \n - [EndPoint Especies](https://swapi.info/species) \n - [EndPoint Vehiculos](https://swapi.info/vehicles) \n - [EndPoint Naves Espaciales](https://swapi.info/starships) \n",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
      },
    ],
  },
  apis: ["./swagger/swagger.yml"],
};

module.exports = swaggerJsdoc(options);