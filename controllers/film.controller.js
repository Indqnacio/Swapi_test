//*parametros en req.query
//*Id
//*page
//*body
const Film = require("../models/film.model");
const allowedFields = require("../config/film.allowFields.js");
const pick = require("../scripts/picks.js");

const typeModule = "Film";
const limitPage = 10;

exports.getFilmById = async (req, res) => {
  try {
    const film = await Film.findById(req.params.id);
    res.json(film);
  } catch (err) {
    res.status(404).json({ error: typeModule + " no encontrado" });
  }
};

exports.getFilmsSelect = async (req, res) => {
  try {
    const film = await Film.find({}, { _id: 1, title: 1 });
    res.json(film);
  } catch (err) {
    res
      .status(404)
      .json({ error: typeModule + " no encontrado, el error es" + err });
  }
};

exports.getFilmPage = async (req, res) => {
  const page = Number(req.query.page) || 1;

  try {
    const films = await Film.find()
      .sort({ title: 1 })
      .skip((page - 1) * limitPage)
      .limit(limitPage);

    if (!films) {
      return res
        .status(404)
        .json({ error: "Los planetas no fueron encontrados" });
    }

    res.status(200).json(films);
  } catch (error) {
    res.status(500).json({
      error:
        "Ha ocurrido un error al obtener la informacion de la pagina " +
        page +
        " de el " +
        typeModule,
    });
  }
};

exports.postFilm = async (req, res) => {
  try {
    //indicando que columnas se deben recibir
    const cleanBody = pick(req.body, allowedFields);
    const newFilm = await Film.create(cleanBody);
    res.status(201).json(newFilm);
  } catch (error) {
    //!por si ya existe un dato repetido
    if (error.code === 11000) {
      return res.status(409).json({
        error: "La pelicula ya existe",
        duplicatedFields: error.keyValue,
      });
    }
    res.status(500).json({
      error: "Ha ocurrido un error al insertar un nuevo " + typeModule,
    });
  }
};

exports.editFilm = async (req, res) => {
  const cleanBody = pick(req.body, allowedFields);
  try {
    const film = await Film.findByIdAndUpdate(req.params.id, cleanBody, {
      new: true,
      runValidators: true,
    });

    if (!film) {
      return res.status(404).json({ error: "Film no encontrada" });
    }
    res.status(200).json(film);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        error: "Ese nombre de la pelicula ya existe",
        duplicatedFields: error.keyValue,
      });
    }
    res.status(500).json({
      error:
        "Ha ocurrido un error con " +
        typeModule +
        " con id " +
        req.params.id +
        " al ser editado",
    });
  }
};

exports.deleteFilm = async (req, res) => {
  try {
    const delFilm = await Film.findByIdAndDelete(req.params.id);
    res.json({ message: "film eliminado" });
  } catch (error) {
    res.status(500).json({
      error:
        "Ha ocurrido un error con " +
        typeModule +
        " con id " +
        req.params.id +
        " al ser borrado",
    });
  }
};