import UserModel from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
    try {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt)
        const newUser = new UserModel({...req.body, password: passwordHash});
        await newUser.save();
        res.status(200).send("Пользователь создан!");
    } catch (err) {
        console.log(err)
        next(err)
    }
};
export const login = async (req, res, next) => {
    try {

        const user =await UserModel.findOne({email: req.body.email})
        if(!user) {
            return res.status(404).json({message: 'Sorry, этот пользователь отсутсвует'})
        }
        const isValidPassword = await bcrypt.compare(req.body.password, user.password);
        if(!isValidPassword) {
            return res.status(400).json({message: 'Sorry, неверный логин или пароль'})
        }
        const token = jwt.sign({id: user._id}, 'secret', {expiresIn: '30d'})
        //что бы не возаращать пароль
        const {password, ...userData} = user._doc
        res.json({
            ...userData,
            token
        })

    } catch (err) {
        console.log(err)
        next(err)
    }
};

export const getMe = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.userId);
        console.log(user)
        if(!user) {
            return res.status(404).json({message: 'Пользователь не найден'})
        };
        const {password, ...userData} = user._doc;

        res.json({...userData})
    }catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось '
        })
    }
};