# NodeJs + Express + MongoDB Boilerplate

This is a [NodeJs](https://nodejs.org/en), [Express](https://expressjs.com/) and [MongoDB](https://www.mongodb.com/) project with authentication, logging and session management using JWT token.

## Getting Started

Fork the repo [node-express-boilerplate](https://github.com/jspanther/node-express-boilerplate.git) and clone it in your local system.

```bash
$ git clone https://github.com/jspanther/node-express-boilerplate.git
```

After cloning is complete go the the project directory and run the install script.

```bash
$ cd node-express-boilerplate/
$ npm install
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result if the API's are working.

All the API routes are generated dynamically based on the file structure available in the `routes/api_routes`.

- **Eg:-** If the `routes/api_routes` has a file named `auth.js` then the route generated for all the API's inside that `auth.js` file will have the url as `api/auth/endpoint`, where _endpoint_ is the API in the `auth.js` file.

Currently the base route path for all the API's is `api/` if you want to add a new base route patch add the new path to the `routes/index.js` and call the respective module_api resolver like in the `routes/api_route.js`.

All the API controllers, services, models and middleware is located in the `src/` folder.

You can start editing the API's by modifying `src/`.

- API controllers are in `src/controllers`
- API middleware are in `src/middleware`
- API models are in `src/models`
- API services are in `src/services`
- API helper functions for error management and response management are in `helpers/`
- API configurations are in `config/`
- API will need a .env file to work properly, sample config is given below.

```bash
# MongoDB Url
MONGO_URL=mongodb://<username>:<Password>@localhost:27017/<dbName>?authSource=admin&readPreference=primary&ssl=false&directConnection=true
# PORT
PORT=3000
# Environment Name. production / development
NODE_ENV=development
# JWT Secret
JWT_SECRET= 'enter the jwt secret'
```
