const blogRoutes = require('./blogs');

const constructorMethod = (app) => {
  app.use('/blog', blogRoutes);


  app.get("/blog/logout", async (req, res) => {
    // trigger /logout router to logout
    res.clearCookie("AuthCookie");
    res.clearCookie("Build Session");
    req.session.destroy();
    res.status(200).redirect("/blog/login");
  });

  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route Not Found' });
  });
};

module.exports = constructorMethod;