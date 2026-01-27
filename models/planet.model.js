const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const planetSchema = new Schema(
  {
    name: { type: String, required: true },
    diameter: { type: Number }, // algunos planetas de SWAPI tienen "unknown" no se que deberia hacer
    // diameter: { type: Number, required: true }, //?Como se podria poner en kilometros o ya con eso esta bien
    rotationPeriod: { type: Number },
    orbitalPeriod: { type: Number },
    gravity: [
      {
        value: { type: Number }, // podria ser 1.5
        description: { type: String }, //! el texto "surface" O "Cloud City" o otros mas
      },
    ],
    population: { type: Number }, //promedio pero no se a que se refiere con promedio
    climate: [{ type: String }],
    terrain: [{ type: String }],
    waterSurfacePer: { type: Number },
    // guardamos la URL original de SWAPI para poder resolver relaciones luego
    swapiUrl: { type: String, index: true },
  },
  {
    timestamps: true,
    versionKey: false,

    toJSON: {
      transform: (_, response) => {
        delete response.createdAt;
        delete response.updatedAt;
        delete response.__v;
      },
    },
  },
);
// índice único por nombre osea le agregamos un indice
planetSchema.index({ name: 1 }, { unique: true });

module.exports =
  mongoose.models.Planet || mongoose.model("Planet", planetSchema);
