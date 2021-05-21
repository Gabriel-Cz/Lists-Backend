import express from 'express'
import bcrypt from 'bcrypt'
import User from '../models/user'

const _ = require('underscore');
const router = express.Router();
 
const { verificateAuth } = require('../middlewares/auth'); 
const saltRound = 10;

router.post('/new-user', async(req, res) => {

    const body = _.pick(req.body, ['name', 'email', 'password'])
    try {
        const userDB = await User.findOne({email: body.email});
        if(userDB) {
            return res.status(401).json({
                message: "El email ya se encuentra registrado, Inicia Sesion."
            });
        } else if (body.password !== '') {
            body.password = bcrypt.hashSync(req.body.password, saltRound);
            const userDB = await User.create(body);
            return res.status(200).json(userDB);
        } else {
            const userDB = await User.create(body);
            return res.status(400).json({
                message: "La contraseña es necesaria."
            });
        }
    }

    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'La contraseña es necesaria.',
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
