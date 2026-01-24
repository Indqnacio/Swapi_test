const Vehicle = require("../models/vehicle.model");
const allowedFields = require("../config/vehicle.allowFields.js");
const pick = require("../scripts/picks.js");

const typeModule = "Vehicle";
const limitPage = 10;

exports.postVehicles = async (req, res) => {
  try {
    const cleanBody = pick(req.body, allowedFields);
    const newVehicle = await Vehicle.create(cleanBody);
    res.status(201).json(newVehicle);
  } catch (error) {
    res.status(500).json({
      error:
        "Ha ocurrido un error al insertar el nuevo " +
        typeModule +
        " y el error es: " +
        error,
    });
  }
};

exports.editVehicle = async (req, res) => {
  const cleanBody = pick(req.body, allowedFields);
  try {
    const vehicleEdited = await Vehicle.findByIdAndUpdate(
      req.params.id,
      cleanBody,
      {
        new: true,
        runValidators: true,
        // select: "-createdAt -updatedAt -__v",
      },
    );

    if (!vehicleEdited) {
      return res.status(404).json({ error: "El vehiculo no fue encontrado" });
    }
    res.status(200).json(vehicleEdited);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ha ocurrido un error al editar la " + typeModule });
  }
};

exports.deleteVehicle = async (req, res) => {
  try {
    const delVehicle = await Vehicle.findByIdAndDelete(req.params.id);

    if (!delVehicle) {
      return res.status(404).json({ error: "El vehiculo no fue encontrado" });
    }

    res.status(200).json({ message: "El vehiculo ha sido eliminado" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ha ocurrido un error al borrar el " + typeModule });
  }
};

exports.getVehiclePage = async (req, res) => {
  const page = Number(req.query.page) || 1;

  try {
    const vehicle = await Vehicle.find()
      .sort({ name: 1 })
      .skip((page - 1) * limitPage)
      .limit(limitPage);

    if (!vehicle) {
      return res
        .status(404)
        .json({ error: "Los vehiculos no fueron encontrados" });
    }
    res.status(200).json(vehicle);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ha ocurrido un error al insertar la " + typeModule });
  }
};

//Este solo devuelve el nombre y id
exports.getVehicleSelect = async (req, res) => {
  try {
    const vehicle = await Vehicle.find({}, { _id: 1, name: 1 });
    res.status(200).json(vehicle);
  } catch (err) {
    res.status(404).json({ error: typeModule + " no encontrado" });
  }
};

//! FALTA QUITAR LAS FECHAS, se me olvido
exports.getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res
        .status(404)
        .json({ error: "La Nave espacial no fue encontrada" });
    }

    res.status(200).json(vehicle);
  } catch (err) {
    res.status(404).json({ error: typeModule + " no encontrado" });
  }
};
