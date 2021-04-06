import express from 'express';
import List from '../models/list';
import User from '../models/user';

const { verificateAuth } = require('../middlewares/auth');
const router = express.Router();

router.post('/new-list', verificateAuth, async(req, res) => {
    const body = req.body;
    body.userId = req.user._id;
    try {
        const listDB = await List.create(body);
        res.status(200).json(listDB);
    } catch (error) {
        return res.status(400).json({
            message: 'error',
            error
        });
    }
});

router.get('/list', verificateAuth, async(req, res) => {
    const userId = req.user._id;
    const listTitle = req.body.title;
    try {
        const listDB = await List.findOne({userId: userId, list_title: listTitle});
        res.status(200).json({listDB});
    } catch (error) {
        return res.status(400).json({
            message : "error",
            error,
        });
    }
});

router.get('/', verificateAuth, async (req, res) => {
    const userId = req.user._id;
    try {
        const listDB = await List.findOne({userId});
    } catch (error) {
        return res.status(400).json({
            message: 'error al buscar lista',
            error
        });
    } 
});

module.exports = router;