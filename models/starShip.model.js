const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const starShipSchema = new Schema(
  {
    name: { type: String, required: true },
    model: { type: String, required: true },
    starshipClass: { type: String },
    size: { type: Number },
    passangers: { type: Number },
    maxAtmosphericSpeed: { type: Number },
    hyperdrive: { type: String },
    MGLT: { type: Number },
    weightCapacity: { type: Number }, //? como se muestra en kilos

    //! Esto lo podria poner en formato de dias, por que si esta en dias entonces es mas manejable
    //! convertir 2 años = 730 dias con esto seria muy simple las conversiones
    //consumables: { type: String },
    consumables: { type: Number }, //?sera en formato dias
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, response) => {
        delete response.createdAt;
        delete response.updatedAt;
        delete response.__v;
      },
    },
  },
);

module.exports = mongoose.model("Starship", starShipSchema);

