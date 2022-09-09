import {Router} from 'express';
import {deleteUser, dislike, getUser, like, subscribe, unsubscribe, updateUser} from "../controllers/userController.js";
import checkAuth from "../utils/checkAuth.js";

const router = new Router();

router.put('/:id', checkAuth, updateUser)
router.delete('/:id', checkAuth, deleteUser)
router.get('/find/:id', getUser)
router.put('/sub/:id', checkAuth, subscribe)
router.put('/unsub/:id', checkAuth, unsubscribe)
router.put('/like/:videoId', checkAuth, like)
router.put('/dislike/:videoId', checkAuth, dislike)

export default router;