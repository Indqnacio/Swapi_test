//*parametros en req.query
//*Id
//*page
//*body
const Film = require("../models/film.model");
const typeModule = "Film";
const limitPage = 2;

//ESTE ES SOLO PARA PRUEBAS
exports.getAll = async (req, res) => {
  try {
    const films = await Film.find()
      .sort({ title: 1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json(films);
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Ha ocurrido un error al insertar un nuevo " + limitPage,
      });
  }
};

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
    res.status(404).json({ error: typeModule + " no encontrado, el error es"+ err });
  }
};

//no se todavia como pero tengo que hacer que obtenga 10 chars
//y que lo haga de modo ordenado

exports.getFilmPage = async (req, res) => {
  const page = Number(req.query.page) || 1;

  try {
    const films = await Film.find()
      .sort({ title: 1 })
      .skip((page - 1) * limitPage)
      .limit(limitPage);

    res.json(films);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ha ocurrido un error al insertar el " + typeModule });
  }
};

exports.postFilm = async (req, res) => {
  debugger;
  try {
    const newFilm = await Film.create(req.body);
    res.status(201).json(newFilm);
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Ha ocurrido un error al insertar un nuevo " + typeModule,
      });
  }
};

exports.editFilm = async (req, res) => {
  try {
    const { createdAt, updatedAt, __v, ...cleanBody } = req.body;
    const film = await Film.findByIdAndUpdate(req.params.id, cleanBody, {
      new: true,
    });
    res.status(200).json(film);
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Ha ocurrido un error con " + typeModule+ " con id " + req.params.id + " al ser editado",
      });
  }
};

exports.deleteFilm = async (req, res) => {
  try {
    const delFilm = await Film.findByIdAndDelete(req.params.id);
    res.json({ message: "film eliminado" });
  } catch (error) {
    res
      .status(500)
      .json({
        error:
          "Ha ocurrido un error con " + typeModule + " con id " + req.params.id + " al ser borrado",
      });
  }
};

exports.getFilmsFromSWAPI = async (req, res) => {
  try {
    const film = await Film.findById(req.params.id);
    res.json(film);
  } catch (err) {
    res.status(404).json({ error: "Film no encontrado" });
  }
};
