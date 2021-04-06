import express from 'express';
import List from '../models/list';

const router = express.Router();
const { verificateAuth } = require('../middlewares/auth');

router.get('/lists', verificateAuth, async(req, res) => {
    const userId = req.user._id;
    try {
        const listsDB = await List.find({userId: userId});
        res.status(200).json(listsDB);
    } catch (e) {
        return res.status(400).json({
            message: "error",
            e,
        });
    }
})

router.get('/list/:_id', verificateAuth, async(req, res) => {
    const listId = req.params._id;
    const userId = req.user._id;
    try {
        const listsDB = await List.findOne({userId: userId, _id: listId});
        res.status(200).json(listsDB);
    } catch (error) {
        return res.status(400).json({
            message: "An error ocurred"
        });
    }
});

/*router.get('/list/:_id', verificateAuth, async(req, res) => {
    const _id = req.params._id;
    const userId = req.user._id;
    try {
        const listsDB = await List.findOne({_id: _id, userId: userId});
        res.status(200).json(listsDB)
    } catch (error) {
        return res.status(500).json({
            message: "error",
            error
        });
    }
});*/

router.post('/new-list', verificateAuth, async(req, res) => {
    const body = req.body;
    body.userId = req.user._id;

    try {
        const listDB = await List.create(body);
        res.status(200).json(listDB);
    } catch (error) {
        return res.status.json({
            message: error,
            error,
        });
    }
})

router.delete('/list/:_id', verificateAuth, async(req, res) => {
    const listId = req.params._id
    const userId = req.user._id
    try {
        const listDB = await List.findOneAndDelete({_id: listId, userId: userId})
        res.status(200).json(listDB)
    } catch (error) {
        return res.status(500).json({
            message: "error",
            error
        });
    }
})

router.put('/list/:_id', verificateAuth, async(req, res) => {
    const id = req.params._id;
    const userId = req.user._id;
    const newTitle = req.body.newTitle;
    const newItems = req.body.newItems;
    try {
        const listDB = await List.findOneAndUpdate(
            { _id: id, userId: userId },
            {
               list_items: newItems
            }
        )
        res.status(200).json(listDB)
    } catch (error) {
        return res.status(500).json({
            message: "error",
            error
        })
    }
})

module.exports = router;