import express from "express";
import user from './user';
import lists from './lists';
import login from './login';

const router = express.Router();

router.use('/user', user);
router.use('/login', login);
router.use('/lists', lists);

export default router;