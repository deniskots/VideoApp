import CommentModel from "../models/Comment.js";
import VideoModel from "../models/Video.js";


export const createComment = async (req, res, next) => {
    try {
        const doc = new CommentModel({...req.body, userId: req.userId})
        const newComment = await doc.save()
        res.json(newComment)
    } catch (e) {
        console.log(e)
        next(e)
    }
}

export const deleteComment = async (req, res, next) => {
    try {
      const comment = await CommentModel.findById(res.params.id)
      const video = await VideoModel.findById(res.params.id)
        if(req.userId === comment.userId || req.userId === video.userId) {
            await CommentModel.findByIdAndDelete(req.params.id)
            res.json('Коментарий был успешно удален')
        }else {
            return next(res.status(404).json('Возможно удалять только свои коментарии'))
        }
    } catch (e) {
        console.log(e)
        next(e)
    }
}
export const getAllComments = async (req, res, next) => {
    try {
        const comments = await CommentModel.find({videoId: req.params.videoId})
        res.json(comments)
    } catch (e) {
        console.log(e)
        next(e)
    }
}