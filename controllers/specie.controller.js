const Specie = require("../models/specie.model");
const typeModule = "Specie";
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
    res.status(200).json(specieEdited);

    if (!specieEdited) {
      return res.status(404).json({ error: "La especie no fue encontrado" });
    }
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

    res.json({ message: "La especie ha sido eliminada" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ha ocurrido un error al borrar el " + typeModule });
  }
};

//obtienes 10 species por pagina
exports.getSpeciePage = async (req, res) => {
  const page = 1;
  page = Number(req.query.page);

  try {
    const specie = await Specie.find()
      .sort({ title: 1 })
      .skip((page - 1) * limitPage)
      .limit(limitPage);

    res.json(specie);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ha ocurrido un error al insertar la " + typeModule });
  }
};
