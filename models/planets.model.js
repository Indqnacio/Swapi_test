const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const planetSchema = new Schema({
  name: { type: String, required: true },
  diameter: { type: String, required: true }, //?Como se podria poner en kilometros o ya con eso esta bien
  rotationPeriod: { type: String },
  orbitalPeriod: { type: String },
  gravity: { type: Number, default:9.8 },     //tal vez deba llevar el 9.8 m/s
  population: { type: Number },               // debe ser promedio, no se como
  weather: { type: String },
  terrain: { type: String },
  waterSurfacePer: { type: String },
},{
    timestamps: true
});
module.exports = mongoose.model('films', filmSchema);