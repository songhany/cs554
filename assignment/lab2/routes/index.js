const myRoutes = require('./myRouter');

const constructorMethod = (app) => {
  app.use('/', myRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Router Not Found' });
  });
};

module.exports = constructorMethod;