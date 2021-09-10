import express from 'express'
import bcrypt from 'bcrypt'
import User from './user.schema';
import _ from 'underscore';

import { verificateAuth } from '../../../auth/authentication';

const router = express.Router();
 
const saltRound = 10;

router.post('/signUp', async(req, res) => {
    const { username, email, password } = req.body;
    try {
        const userDB = await User.findOne({email: email});
        if (userDB !== null) {
            if (username !== null) {
                if (body.password !== '') {  
                    body.password = bcrypt.hashSync(password, saltRound);
                    const userDB = await User.create(body);
                    return res.status(200).json(userDB);
                } else return res.status(400).json({
                    message: "La contraseña es necesaria."
                });    
            } else return res.status(400).json({
                message: "En nombre de usuario es necesario"
            });
        } else return res.status(400).json({
            message: "El correo electronico es necesario",
            error
        });
    }
    catch (error) {
        return res.status(500).json({
            message: 'Error al registrar el usuario, intenta de nuevo mas tarde',
            error
        })
    }
});

router.put('/:id', verificateAuth, async(req, res) => {
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
            message: "Error al cambiar la contraseña, intenta de nuevo mas tarde.",
            error
        })
    }
});

module.exports = router;
