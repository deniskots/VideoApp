import VideoModel from "../models/Video.js";

export const createVideo = async (req, res, next) => {
    try {
        //может быть конфликт??
        const newVideo = new VideoModel({userId: req.userId, ...req.body})
        const savedVideo = await newVideo.save()
        res.json(savedVideo)
    } catch (e) {
        console.log(e)
        next(e)
    }
}
export const updateVideo = async (req, res, next) => {
    try {
        const video = await VideoModel.findById(req.params.id)
        if (req.userId === video.userId) {
            const updatedVideo = await VideoModel.findByIdAndUpdate(req.params.id,
                {
                    $set: req.body
                },
                {
                    new: true
                }
            )
            res.json(updatedVideo)
        }
    } catch (e) {
        console.log(e)
        next(e)
    }
}
export const deleteVideo = async (req, res, next) => {
    try {
        const video = await VideoModel.findById(req.params.id)
        if (req.userId === video.userId) {
            await VideoModel.findByIdAndDelete(req.params.id)
            res.status(200).json("Видео успешно удалено")
        }
    } catch (e) {
        console.log(e)
        next(e)
    }
}
export const getVideo = async (req, res, next) => {
    try {
        const video = await VideoModel.findById(req.params.id)
        res.json(video)
    } catch (e) {
        console.log(e)
        next(e)
    }
}