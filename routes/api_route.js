/* eslint-disable global-require */
'use strict';
import express from 'express';
import path from 'path';
import pluralize from 'pluralize';
import url from 'url';
import HttpError from '../helpers/HttpError.js';
const router = express.Router();

pluralize.addUncountableRule('media');
pluralize.addUncountableRule('auth');

import fs from 'fs';
const routesPath = path.resolve(
  `${path.dirname(url.fileURLToPath(import.meta.url))}/api_routes`
);
const PATHS = fs.readdirSync(routesPath);
const moduleMapper = [];

console.log('✔ Mapping routes');
let apiFunctionName = '';

PATHS.forEach(async (module, index) => {
  if (module !== 'index.js') {
    const name = module.split('.')[0];
    apiFunctionName = await import(`./api_routes/${module}`);

    router.use(`/api/${pluralize.plural(name)}`, apiFunctionName.default);
    moduleMapper.push({
      Module: name,
      Route: `/api/${pluralize.plural(name)}`,
    });
    if (PATHS.length === index + 1) {
      routerFunction();
    }
  }
});

const routerFunction = () => {
  /* List out all the api's */
  console.table(moduleMapper);

  router.use('/*', (req, res, next) => {
    // 404 handler
    const error = new Error('Ressource ikke fundet');

    error.statusCode = 404;
    next(error);
  });

  router.use((err, req, res, next) => {
    if (process.env.NODE_ENV !== 'production') {
      console.error(req.method, req.url, err.statusCode, err.message);
    }
    const error = new HttpError(err);

    res.status(error.statusCode);
    res.json(error);
    next();
  });
};

export default router;
