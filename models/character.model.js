const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const characterSchema = new Schema(
  {
    name: { type: String, required: true },
    birthDay: { type: String },
    eyeColor: { type: String },
    gender: { type: String },

    hairColor: [{ type: String }],
    mass: [{ type: Number }],
    skinColor: [{ type: String }],

    //Relaciones
    homeworld: { type: Schema.Types.ObjectId, ref: "Homeworld" },
    films: [{ type: Schema.Types.ObjectId, ref: "Films" }],
    species: [{ type: Schema.Types.ObjectId, ref: "Species" }],
    starships: [{ type: Schema.Types.ObjectId, ref: "Starship" }],
    vehicles: [{ type: Schema.Types.ObjectId, ref: "Vehicle" }],
  },
  {
    //? sin esto tendremos una variables"__v"
    versionKey: false,
    timestamps: true,

    //? no devolvemos estos campos
    toJSON: {
      transform: (_, response) => {
        delete response.createdAt;
        delete response.updatedAt;
      },
    },
  },
);
module.exports = mongoose.model("Charcter", characterSchema);

//*esto evita que pongamos informacion repetida, pero nosotros definimos:
//*  que campos no pueden ser duplicados
characterSchema.index({ name: 1}, { unique: true })