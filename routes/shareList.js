import express from 'express';
import List from '../models/list';

const router = express.Router();
const { verificateAuth } = require('../middlewares/auth');

router.put('/list/:_id', verificateAuth, async(req, res) => {
    const id = req.params._id;
    const body = req.body;
    const userId = body.userId;
    const sharedUserId = body.sharedUserId;
    try {
        const listDB = await List.findOneAndUpdate(
            {_id: id, userId: userId},
            {sharedUserId: sharedUserId}
        );
        res.status(200).json(listDB);
    } catch (error) {
        return res.status.json({
            message: error,
            error,
        });
    }
})

module.exports = router;