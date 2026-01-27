require('dotenv').config();
const mongoose = require('mongoose');
const { seedSpecies } = require('./swapi.seed');

mongoose
  .connect('mongodb://127.0.0.1:27017/swapiTest')
  .then(async () => {
    try {
      await seedSpecies();
      console.log('seedSpecies terminado ');
      process.exit(0);
    } catch (err) {
      console.error('seedSpecies error', err.message || err);
      process.exit(1);
    }
  })
  .catch(err => {
    console.error('Mongo connect error', err.message || err);
    process.exit(1);
  });
