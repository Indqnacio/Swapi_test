const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const specieSchema = new Schema(
  {
    name: { type: String, required: true },
    classification: { type: String, required: true },
    designation: { type: String },
    averageHeight: { type: Number }, //cm
    averageLifeSpan: { type: Number }, //years                    //?Como se podria obtener un promedio

    eyeColors: [{ type: String }],
    hairColor: [{ type: String }],
    skinColor: [{ type: String }],

    language: { type: String },

    homeworld: {
      type: Schema.Types.ObjectId,
      ref: "Homeworld",
    }, 
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model("Specie", specieSchema);
