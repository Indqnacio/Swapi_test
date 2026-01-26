const mongooseToSwagger = require("mongoose-to-swagger");
const swaggerAutogen = require("swagger-autogen")();
require("dotenv").config();
const outputFile = "./swagger.json";
const endPointsFiles = ["./app.js"];
const port = "localhost:3000";

const doc = {
  info: {
    title: "Starwars Data Base",
    descritpion:
      "Esta Api te permite mirar todos tus personajes favoritos de star wars",
  },
  host: port,
  schemes: ["http"],

  components: {
    schemas: {
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
                example:["69725af30a2ddb5f8a75704c"],
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
        },
      },
    },
  },
};

swaggerAutogen(outputFile, endPointsFiles, doc);
