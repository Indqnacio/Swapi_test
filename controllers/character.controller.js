const Character = require("../models/character.model");
const allowedFields = require("../config/character.allowFields.js");
const pick = require("../scripts/picks.js");

const typeModule = "Personaje";
const limitPage = 10;

//! Falta solucionar esto.
//!    Que deberia hacer si se repite un usuario
//     Que campos no se pueden repetir
// //! pueden haber dos personas con el mismo nombre pero el resto diferente?
//     Obvio que si se detecta este caso decir
//     "corrige la informacion ese usuario ya existe"

//? como saber que el usuario se repitio

exports.postCharacter = async (req, res) => {
  try {
    const cleanBody = pick(req.body, allowedFields);
    const newCharacter = await Character.create(cleanBody);
    res.status(201).json(newCharacter);
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

exports.editCharacter = async (req, res) => {
  const cleanBody = pick(req.body, allowedFields);
  try {
    const characterEdited = await Character.findByIdAndUpdate(
      req.params.id,
      cleanBody,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!characterEdited) {
      return res.status(404).json({ error: "El personaje no fue encontrado" });
    }
    res.status(200).json(characterEdited);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ha ocurrido un error al editar el " + typeModule });
  }
};

exports.deleteCharacter = async (req, res) => {
  try {
    const delCharacter = await Character.findByIdAndDelete(req.params.id);

    if (!delCharacter) {
      return res.status(404).json({ error: "El character no fue encontrado" });
    }

    res.status(200).json({ message: "El character ha sido eliminado" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ha ocurrido un error al borrar el " + typeModule });
  }
};

//falta hacer los getters