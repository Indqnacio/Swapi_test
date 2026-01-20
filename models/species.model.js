const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const speciesSchema = new Schema({
  name: { type: String, required: true },
  classification: { type: String, required: true }, //?Como se podria poner en kilometros o ya con eso esta bien
  designation: { type: String },
  height: { type: Number },
  averageLife: { type: Number},                     //?Como se podria obtener un promedio
  eyeColor: { type: Number },
  hairColor: { type: String },
  skinColor: { type: String },
  lenguage: { type: String },
  
  homeworld: { type: String }, //! ESTA ES UNA RELACION A LA TABLA HOMEWORLD NO SE COMO SE HACE
},{
    timestamps: true
});
module.exports = mongoose.model('films', filmSchema);