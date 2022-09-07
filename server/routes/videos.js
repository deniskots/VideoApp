import {Router} from 'express';
import {
    addView,
    createVideo,
    deleteVideo,
    getVideo,
    randomVideos, search, subscribedVideos, tagVideos,
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
router.get('/trend', trendVideos)
router.get('/random', randomVideos)
router.get("/tags", tagVideos)
router.get("/search", search)
router.get('/sub',checkAuth, subscribedVideos )

export default router;