import express from 'express'
const router = express.Router();

import User from '../models/user'

// Hash for the password
const bcrypt = require('bcrypt');
const _ = require('underscore');
 
const { verificateAuth } = require('../middlewares/auth'); 
const saltRound = 10;

router.post('/new-user', async(req, res) => {

    const body = {
        name: req.body.name,
        email: req.body.email,
    }

    body.password = bcrypt.hashSync(req.body.password, saltRound);
    
    try {
        const userDB = await User.findOne({email: body.email});
        if(userDB) {
            return res.status(401).json({
                message: "El email ya se encuentra registrado, Inicia Sesion."
            });
        } else {
            const userDB = await User.create(body);
            res.status(200).json(userDB);
        }
    }

    catch (err) {
        return res.status(500).json({
            message: "No se pudo registrar el usuario, intenta de nuevo",
        })
    }
});

//Routes
router.put('/user/:id', verificateAuth, async(req, res) => {
    const id = req.params.id;
    const body = _.pick(req.body, ['name', 'email', 'password']);

    if(body.password) {
        body.password = bcryp.hashSync(req.body.password, saltRound);
    }

    try {
        const userDB = await User.findByIdAndUpdate(id, body, {new: true});
        res.status(200).json(userDB);
    }
    catch(error) {
        return res.status(400).json({
            message: "Ha ocurrido un error",
            error
        })
    }
});

module.exports = router;
