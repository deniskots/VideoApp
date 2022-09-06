import UserModel from '../models/User.js';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
    try {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt)
        const newUser = new UserModel({...req.body, password: passwordHash});
        await newUser.save();
        res.status(200).send("Пользователь создан!");
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось произвести регистрацию'
        })
    }
};