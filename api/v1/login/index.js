import express from 'express';
import User from '../user/user.schema';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/', async(req, res) => {
    const body = req.body
    try {
        const userDB = await User.findOne({email: body.email});

        if (userDB !== null) {
            if (!bcrypt.compareSync(body.password, userDB.password)) {
                return res.status(400).json({
                    message: "La Contraseña es invalida, intenta nuevamente."
                });
            } else {
                let token = jwt.sign({
                    data: userDB,
                }, 'secret', { expiresIn: 60 * 24 * 60 *24 });
    
                return res.status(200).json({
                    userDB,
                    token: token
                });
            }
        } else {
            return res.status(400).json({
                message: "El correo electronico es invalido o no se encuentra registrado, intenta nuevamente."
            });
        }

    }
    catch (err) {
        return res.status(500).json({
            message: "Error del servidor, intentalo de nuevo mas tarde.",
        });
    }
})

module.exports = router;