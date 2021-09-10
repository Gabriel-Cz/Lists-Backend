import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import helmet from 'helmet';
import compression from 'compression';

import connectDB from './database';
import api from './api/v1';

const app = express();

connectDB();

//Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded( { extended: true, } ));
app.use(compression());

//API
app.use('/api', api);

//Middleware for Vue Router history mode
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

//Auto Port
app.set('puerto', process.env.PORT || 3000 );
app.listen(app.get('puerto'), () => {
    console.log('This app is listening on port' + app.get('puerto'));
});