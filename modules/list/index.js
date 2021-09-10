import express from 'express';

const app = express();

const listModule = () => {
    app.use('/api/lists', require('./api'));
}

module.exports = listModule;