//imports
const StarShip = require("../models/starship.model");
//const locales
const typeModule = "StarShip";
const limitPage = 10;

exports.postStarShip = async (req, res) => {
  try {
    const newStarShip = await StarShip.create(req.body);
    res.status(201).json(newStarShip);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        error: "La Nave Espacial ya existe",
        duplicatedFields: error.keyValue,
      });
    }

    res.status(500).json({
      error:
        "Ha ocurrido un error al insertar la " +
        typeModule +
        " y el error es: " +
        error,
    });
  }
};

exports.editStarShip = async (req, res) => {
  try {
    const starShipEdited = await StarShip.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
    starShipEdited.map;
    if (!starShipEdited) {
      return res
        .status(404)
        .json({ error: "La Nave Espacial no fue encontrada" });
    }
    res.status(200).json(starShipEdited);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        error: "La Nave Espacial ya existe",
        duplicatedFields: error.keyValue,
      });
    }
    res
      .status(500)
      .json({ error: "Ha ocurrido un error al editar la " + typeModule });
  }
};

exports.deleteStarShip = async (req, res) => {
  try {
    const delStarShip = await StarShip.findByIdAndDelete(req.params.id);

    if (!delStarShip) {
      return res
        .status(404)
        .json({ error: "La Nave Espacial no fue encontrado" });
    }

    res.status(200).json({ message: "La Nave Espacial ha sido eliminada" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ha ocurrido un error al borrar la " + typeModule });
  }
};

exports.getStarShipPage = async (req, res) => {
  const page = Number(req.query.page) || 1;
  try {
    const starShip = await StarShip.find()
      .sort({ name: 1 })
      .skip((page - 1) * limitPage)
      .limit(limitPage);
    starShip;
    res.status(200).json(starShip);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ha ocurrido un error al insertar la " + typeModule });
  }
};

//Este solo devuelve el nombre y id
exports.getStarShipSelect = async (req, res) => {
  try {
    const starShip = await StarShip.find({}, { _id: 1, name: 1 });
    res.status(200).json(starShip);
  } catch (err) {
    res.status(404).json({ error: typeModule + " no encontrado" });
  }
};

exports.getStarShipById = async (req, res) => {
  try {
    const starShip = await StarShip.findById(req.params.id);
    if (!starShip) {
      return res
        .status(404)
        .json({ error: "La Nave espacial no fue encontrada" });
    }

    res.status(200).json(starShip);
  } catch (err) {
    res.status(404).json({ error: typeModule + " no encontrado" });
  }
};
