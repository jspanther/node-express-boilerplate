const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const logger = require("morgan");
const helmet = require("helmet");
require("dotenv").config();

const { setRoutes } = require("./routes/index");

const app = express();

// Initialize DB Connection
require("./config/database");

// Allow Origins according to your need.
corsOptions = { origin: "*" };

app.use(helmet());
app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

// Setting up Routes
setRoutes(app);

module.exports = app;
