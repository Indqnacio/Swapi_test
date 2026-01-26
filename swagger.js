const mongooseToSwagger = require("mongoose-to-swagger");
const swaggerAutogen = require("swagger-autogen")();
require("dotenv").config();
const outputFile = "./swagger.json";
const endPointsFiles = ["./routes/api/index.js"];
const port = "localhost:3000/api";

const doc = {
  info: {
    title: "Starwars Data Base",
    description: "API de Star Wars",
  },
  host: port,
  schemes: ["http"],

  tags: [
    {
      name: "Species",
      description: "Informacion relevante de las especies",
    },
    {
      name: "Characters",
      description: "Informacion relevante de los personajes",
    },
    {
      name: "Planets",
      description: "Informacion relevante de los planetas",
    },
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
            example: ["blue", "orange"],
          },
          hairColor: {
            type: "array",
            items: { type: "string" },
            example: ["brown"],
          },
          skinColor: {
            type: "array",
            items: { type: "string" },
            example: ["fair"],
          },
          homeworld: {
            type: "string",
            example: "697281b3f14d2f2599de8e34",
          },
          films: {
            type: "string",
            example: ["69725af30a2ddb5f8a75704c"],
          },
          species: {
            type: "string",
            example: "6973b719545b85d0ac5c82b5",
          },
          starships: {
            type: "string",
            example: "6973d624bb237088f2eb5db3",
          },
          vehicles: {
            type: "string",
            example: "6973e0d4663cc606e4a47304",
          },
        },
      },
      Planet: {
        type: "object",
        required: ["name", "diameter"],
        properties: {
          name: {
            type: "string",
            example: "Tatooine",
          },
          diameter: {
            type: "number",
            example: 10465,
            description: "Diámetro del planeta en kilómetros",
          },
          rotationPeriod: {
            type: "number",
            example: 23,
            description: "Periodo de rotación en horas",
          },
          orbitalPeriod: {
            type: "number",
            example: 304,
            description: "Periodo orbital en días",
          },
          gravity: {
            type: "array",
            items: {
              type: "object",
              properties: {
                value: {
                  type: "number",
                  example: 1.0,
                },
                description: {
                  type: "string",
                  example: "surface",
                },
              },
            },
          },
          population: {
            type: "number",
            example: 200000,
          },
          climate: {
            type: "array",
            items: { type: "string" },
            example: ["arid"],
          },
          terrain: {
            type: "array",
            items: { type: "string" },
            example: ["desert"],
          },
          waterSurfacePer: {
            type: "number",
            example: 2003,
            description: "Porcentaje de superficie cubierta por agua",
          },
        },
      },
    },
  },
};

swaggerAutogen(outputFile, endPointsFiles, doc);
