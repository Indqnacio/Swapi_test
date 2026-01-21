const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const planetSchema = new Schema(
  {
    name: { type: String, required: true },
    diameter: { type: Number, required: true }, //?Como se podria poner en kilometros o ya con eso esta bien
    rotationPeriod: { type: String },
    orbitalPeriod: { type: String },
    gravity: [{
      value: { type: Number },                        // podria ser 1.5
      description: { type: String },                  //! el texto "surface" O "Cloud City" o otros mas
    }], 
    population: { type: Number }, //promedio pero no se a que se refiere con promedio
    climate: [{ type: String }],
    terrain: [{ type: String }],
    waterSurfacePer: { type: String },
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model("Planet", planetSchema);
