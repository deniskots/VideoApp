import {Router} from 'express';
import {
    addView, allVideos,
    createVideo,
    deleteVideo,
    getVideo,
    subVideos, tagVideos, titleVideos,
    trendVideos,
    updateVideo
} from "../controllers/videoController.js";
import checkAuth from "../utils/checkAuth.js";


const router = new Router();

router.post('/',checkAuth, createVideo )
router.delete('/:id',checkAuth, deleteVideo )
router.put('/:id',checkAuth, updateVideo )

router.get('/find/:id', getVideo )
router.put('/view/:id', addView )

router.get('/all', allVideos)
router.get('/trend', trendVideos)
router.get("/tags", tagVideos)

router.get("/search", titleVideos)
router.get('/sub',checkAuth, subVideos )

export default router;