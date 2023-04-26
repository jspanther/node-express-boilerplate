import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import logger from 'morgan';

dotenv.config();

import setRoutes from './routes/index.js';

const app = express();

// Initialize DB Connection
import('./config/database.js');
// Allow Origins according to your need.
const corsOptions = { origin: '*' };

app.use(helmet());
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

// Setting up Routes
setRoutes(app);

export default app;
