//*parametros en req.query
//*Id
//*page
//*body
const Film = require("../models/film.model");

const typeModule = "Film";
const limitPage = 10;

exports.getFilmById = async (req, res) => {
  try {
    const film = await Film.findById(req.params.id);
    if (!film) {
      return res.status(500).json("Error no se encontro");
    }
    res.status(200).json(film);
  } catch (err) {
    res.status(404).json({ error: typeModule + " no encontrado" });
  }
};

exports.getFilmsSelect = async (req, res) => {
  try {
    const film = await Film.find({}, { _id: 1, title: 1 });
    if (!film) {
      return res.status(500).json("Error no se encontro");
    }
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
    const newFilm = await Film.create(req.body);
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
  try {
    const film = await Film.findByIdAndUpdate(req.params.id, req.body, {
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
