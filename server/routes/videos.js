import {Router} from 'express';
import {createVideo, deleteVideo, getVideo, updateVideo} from "../controllers/videoController.js";
import checkAuth from "../utils/checkAuth.js";


const router = new Router();

router.post('/',checkAuth, createVideo )
router.delete('/:id',checkAuth, deleteVideo )
router.put('/:id',checkAuth, updateVideo )
router.get('/find/:id', getVideo )
router.put('/view/:id', getVideo )
router.get('/trend', getVideo )
router.get('/random', getVideo )
router.get('/sub', getVideo )

export default router;