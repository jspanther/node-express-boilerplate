'use strict';
import HttpError from '../helpers/HttpError.js';
import apiRoutes from './api_route.js';

const setRoutes = (app) => {
  /**
   * A general visual page to enable user to check if the API's setup is correct.
   */
  app.use('/', (req, res) => {
    res.status(200).send(
      `<html>
          <body>
            <h2>This is a test page render direcly from the server.</h2>
            <h3> ✔ The app is working fine </h3>
            <h3> ✔ Plese check console for the list of API's available</h3>
          </body>
        </html>`
    );
  });

  /**
   * API Route.
   * All the API will start with "/api/[MODULE_ROUTE]"
   */
  app.use('/api', apiRoutes);

  /**
   * If No route matches. Send user a 404 page
   */
  app.use('/*', (req, res) => {
    const error = new Error('Requested path does not exist.');

    error.statusCode = 404;
    res.status(error.statusCode).json(new HttpError(error));
  });
};

export default setRoutes;
