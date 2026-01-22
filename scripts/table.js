const mongoose = require("mongoose");
const Film = require("../models/film.model");

async function showTable() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/swapiTest");

    const films = await Film.find().lean();
    console.table(films);

    await mongoose.disconnect();
  } catch (error) {
    console.error("Error:", error);
  }
}

showTable();
