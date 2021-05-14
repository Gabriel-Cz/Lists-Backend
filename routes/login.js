import express from 'express';
import User from '../models/user';

const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 

const saltRound = 10;

router.post('/', async(req, res) => {
    const body = req.body

    try {
        const userDB = await User.findOne({email: body.email});

        if(!userDB){
            return res.status(401).json({
                message: "El Correo Electronico es invalido, intenta nuevamente."
            });
        }

        if(!bcrypt.compareSync(body.password, userDB.password)){
            return res.status(400).json({
                message: "La Contraseña es invalida, intenta nuevamente."
            });
        }

        let token = jwt.sign({
            data: userDB,
        }, 'secret', { expiresIn: 60 * 24 * 60 *24 });

        return res.status(200).json({
            userDB,
            token: token
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "Error desconocido, intenta nuevamente.",
        });
    }
})

module.exports = router;