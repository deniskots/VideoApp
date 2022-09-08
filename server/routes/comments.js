import {Router} from 'express';
import checkAuth from "../utils/checkAuth.js";
import {createComment, deleteComment, getAllComments} from "../controllers/commentController.js";


const router = new Router();

router.post('/', checkAuth, createComment)
router.delete('/:id', checkAuth, deleteComment)
router.get('/:videoId', getAllComments)

export default router;