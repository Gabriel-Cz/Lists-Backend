import express from 'express';

const userApi = express();

userApi.use('/api/users', require('./api'));
userApi.use('/api/login', require('./api/login'));

module.exports = userApi;