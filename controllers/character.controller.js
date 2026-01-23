const Character = require("../models/character.model");
const typeModule = "Personaje";
const limitPage = 10;

//! que deberia hacer si se repite un usuario
// que campos no se pueden repetir
// //! pueden haber dos personas con el mismo nombre pero el resto diferente?
//Obvio que si se detecta este caso decir
//  "corrige la informacion ese usuario ya existe"

//? como saber que el usuario se repitio