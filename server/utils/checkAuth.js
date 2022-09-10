import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const token = req.cookies.access_token;
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