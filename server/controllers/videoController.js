import VideoModel from "../models/Video.js";
import UserModel from "../models/User.js";


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
        const video = await VideoModel.findByIdAndUpdate(req.params.id, {
            $inc: {views: 1}
        })
        res.json(video)
    } catch (e) {
        console.log(e)
        next(e)
    }
}
export const addView = async (req, res, next) => {
    try {
        await VideoModel.findByIdAndUpdate(req.params.id, {
            $inc: {views: 1}
        })
        res.json('Все прошло успешно')
    } catch (e) {
        console.log(e)
        next(e)
    }
}
export const allVideos = async (req, res, next) => {
    try {
        // const videos = await VideoModel.aggregate([{$sample: {size: 10}}])
        const videos = await VideoModel.find()
        if (!videos) {
            return res.json({message: 'Публикаций нет'})
        }
        res.json(videos)
    } catch (e) {
        console.log(e)
        next(e)
    }
}
export const trendVideos = async (req, res, next) => {
    try {
        //сорт. самые популярные видео по просмотрам
        const videos = await VideoModel.find().sort({views: -1})
        res.json(videos)
    } catch (e) {
        console.log(e)
        next(e)
    }
}
export const tagVideos = async (req, res, next) => {
    try {
        const tags = req.query.tags.split(',')
        const videos = await VideoModel.find({tags: {$in: tags}}).limit(10)
        res.json(videos)
    } catch (e) {
        console.log(e)
        next(e)
    }
}
export const titleVideos = async (req, res, next) => {
    try {
        const query = req.query.q
        const videos = await VideoModel.find({
            title: {$regex: query, $options: "i"},
        }).limit(20)
        res.json(videos)
    } catch (e) {
        console.log(e)
        next(e)
    }
}
export const subVideos = async (req, res, next) => {
    try {
        const id = req.userId
        const user = await UserModel.findById(id)
        const subChannel = user.subscribedUsers
        const list = await Promise.all(
            subChannel.map( async (itemId) => {
                return await VideoModel.find({userId: itemId})
            })
        )
        //возращаю массив с обьеденненными в него массивы
        //и сортирую для показа последнего создаваемого элемента массива
        res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt))
    } catch (e) {
        console.log(e)
    }
}