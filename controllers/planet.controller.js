const { text } = require("body-parser");
const Planet = require("../models/planet.model");
const typeModule = "Planeta";
const limitPage = 10;

//Este solo devuelve el nombre y id
exports.getPlanetSelect = async (req, res) => {
  try {
    const planet = await Planet.find({}, { _id: 1, name: 1 });
    res.json(planet);
  } catch (err) {
    res.status(404).json({ error: typeModule + " no encontrado" });
  }
};

exports.getPlanetById = async (req, res) => {
  try {
    const planet = await Planet.findById(req.params.id);
    res.json(planet);
  } catch (err) {
    res.status(404).json({ error: typeModule + " no encontrado" });
  }
};

//obtienes 10 planetas por pagina
exports.getPlanetPage = async (req, res) => {
  const page = Number(req.query.page) || 1;

  try {
    const planets = await Planet.find()
      .sort({ name: 1 })
      .skip((page - 1) * limitPage)
      .limit(limitPage);

    if (!planets) {
      return res
        .status(404)
        .json({ error: "Los planetas no fueron encontrados" });
    }

    res.json(planets);
  } catch (error) {
    res
      .status(500)
      .json({
        error:
          "Ha ocurrido un error al obtener la informacion de " + typeModule,
      });
  }
};

exports.postPlanet = async (req, res) => {
  try {
    const newPlanet = await Planet.create(req.body);
    res.status(201).json(newPlanet);
  } catch (error) {
    res.status(500).json({
      error:
        "Ha ocurrido un error al insertar el " +
        typeModule +
        " y el error es: " +
        error,
    });
  }
};

exports.editPlanet = async (req, res) => {
  try {
    const { createdAt, updatedAt, __v, ...cleanBody } = req.body;
    const planetEdited = await Planet.findByIdAndUpdate(
      req.params.id,
      cleanBody,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!planetEdited) {
      return res.status(404).json({ error: "El planeta no fue encontrado" });
    }

    res.status(200).json(planetEdited);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ha ocurrido un error al editar el " + typeModule });
  }
};

exports.deleteFilm = async (req, res) => {
  try {
    const delPlanet = await Planet.findByIdAndDelete(req.params.id);
    res.json({ message: "El planeta ha sido eliminado" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ha ocurrido un error al borrar el " + typeModule });
  }
};

/** EXAMPLE
 * {
 *  "name":"Tatooine",
 *  "diameter":"20,000 km",
 *  "rotationPeriod":" 23 ",
 *  "orbitalPeriod":"304",
 *  "gravity":[
 *     {
 *       "1":"standard"
 *     }
 *   ],
 *  "population":"200000",
 *  "climate":"arid",
 *  "terrain":"desert",
 *  "waterSurfacePer":"1",
 * }
 */
