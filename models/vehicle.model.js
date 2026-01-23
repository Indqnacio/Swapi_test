const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
  name: { type: String, required: true },
  model: { type: String, required: true }, 
  vehicleClass: { type: String },
  size: { type: Number },
  passangers: { type: Number},                     
  maxAtmosphericSpeed: { type: Number },
  weightCapacity: { type: Number },                   //? como se muestra en kilos
  consumables: {type:String },
},{
    timestamps: true,
    toJSON: {
      transform: (_, response) => {
        delete response.createdAt;
        delete response.updatedAt;
        delete response.__v
      },
    }
});
module.exports = mongoose.model('Vehicle', vehicleSchema);