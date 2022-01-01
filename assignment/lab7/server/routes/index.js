const pokemonRoutes = require('./pokemon');

const constructorMethod = (app) => {
  app.use('/pokemon', pokemonRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route Not Found' });
  });
};

module.exports = constructorMethod;