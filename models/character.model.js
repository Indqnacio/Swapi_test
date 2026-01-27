const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const characterSchema = new Schema(
  {
    name: { type: String, required: true },
    birthDay: { type: String },
    gender: { type: String },
    mass: { type: String },
    height: {type: Number},

    hairColor: [{ type: String }],
    eyeColor: [{ type: String }],
    skinColor: [{ type: String }],

    //Relaciones
    homeworld: { type: Schema.Types.ObjectId, ref: "Planet" },
    films: [{ type: Schema.Types.ObjectId, ref: "Film" }],
    species: [{ type: Schema.Types.ObjectId, ref: "Species" }],
    starships: [{ type: Schema.Types.ObjectId, ref: "Starship" }],
    vehicles: [{ type: Schema.Types.ObjectId, ref: "Vehicle" }],
  },
  {
    timestamps: true,

    //? no devolvemos estos campos
    toJSON: {
      transform: (_, response) => {
        delete response.createdAt;
        delete response.updatedAt;
        delete response.__v;
      },
    },
  },
);
//*esto evita que pongamos informacion repetida, pero nosotros definimos:
//*  que campos no pueden ser duplicados
characterSchema.index({ name: 1 }, { unique: true });

module.exports = mongoose.model("Charcter", characterSchema);
