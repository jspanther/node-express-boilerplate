"use strict";
const express = require("express");
const router = express.Router();
const pluralize = require("pluralize");
const path = require("path");
const { HttpError } = require("../helpers/HttpError");

pluralize.addUncountableRule("media");
pluralize.addUncountableRule("auth");

const fs = require("fs");
const routesPath = path.resolve(`${__dirname}/api_routes`);
const PATHS = fs.readdirSync(routesPath);
const moduleMapper = [];

console.log("✔ Mapping routes");
PATHS.forEach((module) => {
  if (module !== "index.js") {
    const name = module.split(".")[0];
    console.log(`/${pluralize.plural(name)}`);
    router.use(
      `/api/${pluralize.plural(name)}`,
      require(path.resolve(routesPath, module))
    );
    moduleMapper.push({
      Module: name,
      Route: `/api/${pluralize.plural(name)}`,
    });
  }
});

/* List out all the api's */
console.table(moduleMapper);

router.use("*", (req, res, next) => {
  // 404 handler
  const error = new Error("Resource not found");

  error.statusCode = 404;
  next(error);
});

router.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== "production") {
    console.error(req.method, req.url, err.statusCode, err.message);
  }
  const error = new HttpError(err);

  res.status(error.statusCode);
  res.json(error);
  next();
});

module.exports = router;
