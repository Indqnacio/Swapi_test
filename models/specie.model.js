const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const specieSchema = new Schema(
  {
    name: { type: String, required: true },
    classification: { type: String, required: true },
    designation: { type: String },

    //? debe ser promedio asi que cada vez que se Up,In o Del se modificara, asi tendremos el resultado final en teoria
    averageHeight: { type: Number },    //cm
    averageLifeSpan: { type: Number },  //years                    //?Como se podria obtener un promedio

    eyeColors: [{ type: String }],
    hairColor: [{ type: String }],
    skinColor: [{ type: String }],

    language: { type: String },

    homeworld: {
      type: Schema.Types.ObjectId,
      ref: "Planet",
    }, 
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model("Species", specieSchema);
