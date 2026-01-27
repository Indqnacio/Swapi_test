const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const specieSchema = new Schema(
  {
    name: { type: String, required: true },
    classification: { type: String, required: true },
    designation: { type: String },

    averageHeight: { type: Number }, //cm
    averageLifeSpan: { type: Number }, //years                    //?Como se podria obtener un promedio

    eyeColor: [{ type: String }],
    hairColor: [{ type: String }],
    skinColor: [{ type: String }],

    language: { type: String },

    homeworld: {
      type: Schema.Types.ObjectId,
      ref: "Planet",
    },
    swapiUrl: { type: String, index: true },
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

specieSchema.index({ name: 1 }, { unique: true });

module.exports = mongoose.models.Species || mongoose.model("Species", specieSchema);
