//const swaggerAutogen = require("swagger-autogen")();
const swaggerJsdoc= require("swagger-jsdoc") //swaggerJsdoc from 'swagger-jsdoc';
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
      description: "API for managing Jedi",
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
/*



const doc = {
  swagger: "2.0",

  info: {
    title: "Starwars Data Base",
    description: "API de Star Wars",
  },

  servers: [
    { url: "http://localhost:3000/api" },
  ],

  tags: [
    { name: "Species", description: "Informacion relevante de las especies" },
    {
      name: "Characters",
      description: "Informacion relevante de los personajes",
    },
    { name: "Planets", description: "Informacion relevante de los planetas" },
    { name: "Films", description: "Informacion relevante de las peliculas" },
    { name: "Starships", description: "Informacion relevante de las naves" },
    { name: "Vehicles", description: "Informacion relevante de los vehiculos" },
  ],
  components: {
    schemas: {
      Specie: {
      type: "object",
      required: ["name", "classification"],
      properties: {
        name: { type: "string", example: "Wookiee" },
        classification: { type: "string", example: "mammal" },
        designation: { type: "string", example: "sentient" },
        averageHeight: { type: "number", example: 210 },
        averageLifeSpan: { type: "number", example: 400 },
        eyeColor: {
          type: "array",
          items: { type: "string" },
          example: ["blue", "green"],
        },
        hairColor: {
          type: "array",
          items: { type: "string" },
          example: ["brown"],
        },
        skinColor: {
          type: "array",
          items: { type: "string" },
          example: ["gray"],
        },
        language: { type: "string", example: "Shyriiwook" },
        homeworld: {
          type: "string",
          example: "664d8f8f8f8f8f8f8f8f8f8f",
        },
      },
      },

      Character: {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string", example: "Anakin SkyWalker" },
        birthDay: { type: "string", example: "19BBY" },
        gender: { type: "string", example: "male" },
        mass: { type: "number", example: 77 },
        eyeColor: {
          type: "array",
          items: { type: "string" },
        },
        hairColor: {
          type: "array",
          items: { type: "string" },
        },
        skinColor: {
          type: "array",
          items: { type: "string" },
        },
        homeworld: { type: "string" },
        films: {
          type: "array",
          items: { type: "string" },
        },
        species: { type: "string" },
        starships: { type: "string" },
        vehicles: { type: "string" },
      },
      },

      Planet: {
      type: "object",
      required: ["name", "diameter"],
      properties: {
        name: { type: "string", example: "Tatooine" },
        diameter: { type: "number", example: 10465 },
        rotationPeriod: { type: "number", example: 23 },
        orbitalPeriod: { type: "number", example: 304 },
        population: { type: "number", example: 200000 },
        climate: {
          type: "array",
          items: { type: "string" },
        },
        terrain: {
          type: "array",
          items: { type: "string" },
        },
        waterSurfacePer: { type: "number", example: 20 },
      },
      },

      Film: {
      type: "object",
      required: ["title", "director", "productor"],
      properties: {
        title: { type: "string", example: "A New Hope" },
        director: { type: "string", example: "George Lucas" },
        productor: { type: "string", example: "Gary Kurtz" },
      },
    },

      Starship: {
      type: "object",
      required: ["name", "model"],
      properties: {
        name: { type: "string", example: "Millennium Falcon" },
        model: { type: "string", example: "YT-1300 light freighter" },
        starshipClass: { type: "string", example: "Light freighter" },
        size: { type: "number", example: 34 },
        passangers: { type: "number", example: 6 },
        maxAtmosphericSpeed: { type: "number", example: 1000 },
        hyperdrive: { type: "string", example: "0.5" },
        MGLT: { type: "number", example: 75 },
        weightCapacity: { type: "number", example: 100000 },
        consumables: { type: "number", example: 730 },
      },
      },

      Vehicle: {
      type: "object",
      required: ["name", "model"],
      properties: {
        name: { type: "string", example: "Speeder" },
        model: { type: "string", example: "X-34" },
        vehicleClass: { type: "string", example: "repulsorcraft" },
        size: { type: "number", example: 3 },
        passangers: { type: "number", example: 1 },
        maxAtmosphericSpeed: { type: "number", example: 250 },
        weightCapacity: { type: "number", example: 200 },
        consumables: { type: "number", example: 30 },
      },
      },
    },
  },
};
// Copia los schemas a `definitions` para que swagger-autogen/Swagger 2.0 los reconozca
doc.definitions = doc.components.schemas;

swaggerAutogen(outputFile, endPointsFiles, doc).then(() => {
  // Generado el swagger.json. No arrancamos el servidor aquí para evitar conflictos de puerto.
  console.log('swagger.json generado');
});
*/
