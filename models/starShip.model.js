const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const starShipSchema = new Schema({
  name: { type: String, required: true },
  model: { type: String, required: true }, 
  starshipClass: { type: String },
  size: { type: Number },
  passangers: { type: Number},                     
  maxAtmosphericSpeed: { type: Number },
  hyperdrive: { type: String },
  MGLT: { type: Number },
  weightCapacity: { type: Number },                   //? como se muestra en kilos
  consumables: {type:String },
},{
    timestamps: true
});
module.exports = mongoose.model('Starship', starShipSchema);