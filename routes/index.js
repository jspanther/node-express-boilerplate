"use strict";
const { HttpError } = require("../helpers/HttpError");
const apiRoutes = require("./api_route");

module.exports.setRoutes = (app) => {
  /**
   * API Route.
   * All the API will start with "/api/[MODULE_ROUTE]"
   */
  app.use("/", apiRoutes);

  /**
   * If No route matches. Send user a 404 page
   */
  app.use("/*", (req, res) => {
    const error = new Error("Requested path does not exist.");

    error.statusCode = 404;
    res.status(error.statusCode).json(new HttpError(error));
  });
};
