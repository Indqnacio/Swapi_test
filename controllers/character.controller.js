const Character = require("../models/character.model");
const allowedFields = require("../config/character.allowFields.js");
const pick = require("../scripts/picks.js");

const typeModule = "Personaje";
const limitPage = 10;

  /*
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: { $ref: "#/components/schemas/Character" }
      }
    }
  }
*/

exports.postCharacter = async (req, res) => {
  try {
    const cleanBody = pick(req.body, allowedFields);
    const newCharacter = await Character.create(cleanBody);
    res.status(201).json(newCharacter);
  } catch (error) {
    //Se esta metiendo informacion repetida
    if (error.code === 11000) {
      return res.status(409).json({
        error: "El personaje ya existe",
      });
    }

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
  try {
    const cleanBody = pick(req.body, allowedFields);
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
    if (error.code === 11000) {
      return res.status(409).json({
        error: "Ese nombre de personaje ya existe",
        duplicatedFields: error.keyValue,
      });
    }
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

//obtienes 10 species por pagina
exports.getCharacterPage = async (req, res) => {
  const page = Number(req.query.page) || 1;

  try {
    const character = await Character.find()
      //.select("-createdAt -updatedAt -__v")
      .sort({ name: 1 })
      .populate("homeworld", "name")
      .populate("films", "title")
      .populate("species", "name")
      .populate("starships", "name")
      .populate("vehicles", "name")
      .skip((page - 1) * limitPage)
      .limit(limitPage);
    res.status(200).json(character);
  } catch (error) {
    res.status(500).json({
      error:
        "Ha ocurrido un error al obtener la informacion de el " +
        typeModule +
        error,
      duplicatedFields: error.keyValue,
    });
  }
};

//Este solo devuelve el nombre y id
exports.getCharacterSelect = async (req, res) => {
  try {
    const character = await Character.find({}, { _id: 1, name: 1 });
    res.json(character);
  } catch (err) {
    res.status(404).json({ error: typeModule + " no encontrado" });
  }
};

exports.getCharacterById = async (req, res) => {
  try {
    const character = await Character.findById(req.params.id)
      .populate("homeworld", "name")
      .populate("films", "title")
      .populate("species", "name")
      .populate("starships", "name")
      .populate("vehicles", "name");
    res.json(character);
  } catch (err) {
    res.status(404).json({ error: typeModule + " no encontrado" });
  }
};
