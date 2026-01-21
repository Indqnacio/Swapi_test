//*parametros en req.query
//*Id
//*page
//*body
const Film = require("../models/film.model");

exports.getFilmById = async (req, res) => {
  try {
    const film = await Film.findById(req.params.id);
    res.json(film);
  } catch (err) {
    res.status(404).json({ error: "Film no encontrado" });
  }
};

//no se todavia como pero tengo que hacer que obtenga 10 chars
//y que lo haga de modo ordenado
//talvez lo ideal sea ordenado alphabeticamente
exports.getFilmPage = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = 10;
  try {
    const films = await Film.find()
      .skip((page + 1) * limit)
      .limit(limit);
      
    res.json(films);
  } catch (error) {
    res.status(500).json({ error: "Ha ocurrido un error al insertar el film" });
  }
};

exports.postFilm = async (req, res) => {
  try {
    const newFilm = await Film.create(req.body);
    res.status(201).json(newFilm);
  } catch (error) {
    res.status(500).json({ error: "Ha ocurrido un error al insertar el film" });
  }
};

exports.editFilm = async (req, res) => {
  try {
    const film = await Film.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(film);
  } catch (error) {
    res.status(500).json({ error: "Ha ocurrido un error al editar el film" });
  }
};

exports.deleteFilm = async (req, res) => {
  try {
    const delFilm = await Film.findByIdAndDelete(req.params.id);
    res.json({ message: "film eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Ha ocurrido un error al borrar el film" });
  }
};
