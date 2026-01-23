//la ruta del model
const Specie = require("../models/specie.model");
//solo lo usamos para ponerlo en texto
const typeModule = "Specie";
//es el ritmo de la paginacion
const limitPage = 30;

exports.postSpecie = async (req, res) => {
  try {
    const newSpecie = await Specie.create(req.body);
    res.status(201).json(newSpecie);
  } catch (error) {
    res.status(500).json({
      error:
        "Ha ocurrido un error al insertar la " +
        typeModule +
        " y el error es: " +
        error,
    });
  }
};

exports.editSpecie = async (req, res) => {
  try {
    const { createdAt, updatedAt, __v, ...cleanBody } = req.body;

    const specieEdited = await Specie.findByIdAndUpdate(
      req.params.id,
      cleanBody,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!specieEdited) {
      return res.status(404).json({ error: "La especie no fue encontrado" });
    }

    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ha ocurrido un error al editar la " + typeModule });
  }
};

exports.deleteSpecie = async (req, res) => {
  try {
    const delSpecie = await Specie.findByIdAndDelete(req.params.id);

    if (!delSpecie) {
      return res.status(404).json({ error: "La especie no fue encontrado" });
    }

    res.status(200).json({ message: "La especie ha sido eliminada" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ha ocurrido un error al borrar el " + typeModule });
  }
};

//obtienes 10 species por pagina
exports.getSpeciePage = async (req, res) => {
  const page = Number(req.query.page) || 1;

  try {
    const specie = await Specie.find()
      //.select("-createdAt -updatedAt -__v")
      .sort({ name: 1 })
      .skip((page - 1) * limitPage)
      .limit(limitPage);
    res.status(200).json(specie);

  } catch (error) {
    res
      .status(500)
      .json({
        error:
          "Ha ocurrido un error al obtener la informacion de la " + typeModule,
      });
  }
};

//Este solo devuelve el nombre y id
exports.getSpecieSelect = async (req, res) => {
  try {
    const specie = await Specie.find({}, { _id: 1, name: 1 });
    res.json(specie);
  } catch (err) {
    res.status(404).json({ error: typeModule + " no encontrado" });
  }
};

exports.getSpecieById = async (req, res) => {
  try {
    const specie = await Specie.findById(req.params.id);
    res.json(specie);
  } catch (err) {
    res.status(404).json({ error: typeModule + " no encontrado" });
  }
};
