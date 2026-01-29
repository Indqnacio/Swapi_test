const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const filmSchema = new Schema(
  {
    //name: { type: String, required: true, maxlenght:15, enum: ['ibarra','fernandez','gonzales'] },
    title: { type: String, required: true },
    director: { type: String, required: true },
    productor: [{ type: String, required: true }],
    swapiUrl: { type: String, index: true },
  },
  {
    //con esto creamos un created y updated date
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
//es el que nos relaciona el nombre de la coleccion en la BD con nuestro Schema de arriba ("films")
filmSchema.index({ title: 1 }, { unique: true });

module.exports = mongoose.models.Film || mongoose.model("Film", filmSchema);
