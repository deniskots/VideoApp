import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    try {
        const token = req.cookies.access_token;
        if (!token) return res.status(401).json({message: "You are not authenticated!"});
        //расшифровка токена и достаем айди
        const user = jwt.verify(token, 'secret');
        req.userId = user.id;
        next();
    } catch (e) {
        return res.status(401).json({message: 'Auth error'})
    }
}