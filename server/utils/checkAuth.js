import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    //токен из заголовка авторизат и отделим токен
    const token = (req.headers.authorization || '').split(' ')[1]
    if (token) {
        try {
            //расшифровка токена и достаем айди
            const decoded = jwt.verify(token, 'secret');
            req.userId = decoded.id;
            next();
        } catch (e) {
            return res.status(403).json({message: 'Нет доступа'});
        }
    } else {
        return res.status(403).json({message: 'Нет доступа'});
    }
}