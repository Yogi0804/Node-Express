const express = require("express");
const bodyparser = require("body-parser");
const promoRouter = express.Router();

promoRouter.use(bodyparser.json());

promoRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res, next) => {
    res.end("Will send all the promotions to you!");
  })
  .post((req, res, next) => {
    res.end(
      "Will add the promotions: " +
        req.body.name +
        " with details: " +
        req.body.description
    );
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /promotions");
  })
  .delete((req, res, next) => {
    res.end("Deleting all promotions");
  });

promoRouter
  .route("/:promoId")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res, next) => {
    res.end(
      `Will send the details of the promotions: ${req.params.promoId} to you!`
    );
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end(
      `POST operation is not supported on /promotions/${req.params.promoId}`
    );
  })
  .put((req, res, next) => {
    res.write("Updating the dish: " + req.params.promoId + "\n");
    res.end(
      `Will update the promotions: ${req.body.name} and with details: ${req.body.description}`
    );
  })
  .delete((req, res, next) => {
    res.end(`Deleting promotions: ${req.params.promoId}`);
  });

module.exports = promoRouter;
