import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';

const app = express();

const uri = "mongodb+srv://GabrielAdmin:Gabrieladmin123@cluster0.mzwcn.mongodb.net/SharedListsDB?retryWrites=true&w=majority";
const options = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };

mongoose.connect(uri, options).then(
    () => {
        console.log('DB connected');
    },
    err => {
        console.log(err);
    }
);

const corsOptions = {
    origin: 'http://192.168.1.70:8080'
}

app.use(cors(corsOptions));
app.use(() => {
    res.header("Access-Control-Allow-Origin", "*");
})
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded( { extended: true, } ));

app.use('/api', require('./routes/lists'));
app.use('/login', require('./routes/login'));
app.use('/users', require('./routes/users'));
app.use('/list', require('./routes/list'));

//Middleware for Vue Router history mode
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send('Shared Lists API');
})

//Auto Port
app.set('puerto', process.env.PORT || 3000 );
app.listen(app.get('puerto'), () => {
    console.log('This app is listening on port' + app.get('puerto'));
});