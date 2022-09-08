import UserModel from "../models/User.js";
import VideoModel from "../models/Video.js";

export const updateUser = async (req, res, next) => {
    if (req.params.id === req.userId) {
        try {
            const updatedUser = await UserModel.findByIdAndUpdate(req.params.id,
                {
                    $set: req.body
                },
                {
                    new: true
                }
            )
            res.status(200).json(updatedUser)
        } catch (err) {
            console.log(err)
        }
    } else {
        next(res.status(403).json({message: 'Нет доступа'}))
    }

};

export const deleteUser = async (req, res, next) => {
    if (req.params.id === req.userId) {
        try {
            await UserModel.findByIdAndDelete(req.params.id,)
            res.status(200).json("Пользователь удален")
        } catch (err) {
            console.log(err)
        }
    } else {
        next(res.status(403).json({message: 'Что-то пошло не так'}))
    }
};

export const getUser = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.params.id)
        res.json(user)
    } catch (err) {
        console.log(err)
        next(err)
    }
};

export const subscribe = async (req, res, next) => {
    try {
        await UserModel.findByIdAndUpdate(req.userId, {
            $push: {subscribedUsers: req.params.id}
        })
        await UserModel.findByIdAndUpdate(req.params.id, {
            $inc: {subscribers: 1}
        })
        res.json('Вы успешно подписались!')
    } catch (err) {
        console.log(err)
        next(err)
    }
};

export const unsubscribe = async (req, res, next) => {
    try {
        await UserModel.findByIdAndUpdate(req.userId, {
            $pull: {subscribedUsers: req.params.id}
        })
        await UserModel.findByIdAndUpdate(req.params.id, {
            $inc: {subscribers: -1}
        })
        res.json('Вы успешно отписались!')
    } catch (err) {
        console.log(err)
        next(err)
    }
};

export const like = async (req, res, next) => {
    try {
        await VideoModel.findByIdAndUpdate(req.params.videoId, {
            //этот метод не добавляет айди на каждое добавление в массив(вместо пула)
            $addToSet: {likes: req.userId},
            $pull: {dislikes: req.userId}
        })
        res.json('Вам понравилось это видео')
    } catch (err) {
        console.log(err)
        next(err)
    }
};
export const dislike = async (req, res, next) => {
    try {
        await VideoModel.findByIdAndUpdate(req.params.videoId, {
            //этот метод не добавляет айди на каждое добавление в массив(вместо пула)
            $addToSet: {dislikes: req.userId},
            $pull: {likes: req.userId}
        })
        res.json('Вам не понравилось это видео')
    } catch (err) {
        console.log(err)
        next(err)
    }
};
