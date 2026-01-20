const mongoose = require("mongoose");
const Film = require("../models/films.model");

(async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/swapiTest");
    const newFilm = await Film.create({
      filmName: "prueba la pelicula",
      director: "Antonio Ibarra",
      productor: "Sasha Montenegro",
    });
    console.log(newFilm);
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
})();
