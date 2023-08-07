module.exports = (app) => {

  app.use((req, res, next) => {
    res.status(404).render("not-found");
  });

  app.use((err, req, res, next) => {
    console.error("ERROR DE EXPRESS", req.method, req.path, err);

    if (!res.headersSent) {
      res.status(500).render("error");
    }
  });
};
