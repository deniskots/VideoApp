import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.js';
import userRouter from './routes/users.js';
import commentRouter from './routes/comments.js';
import videoRouter from './routes/videos.js';



const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(cookieParser())

const PORT = process.env.PORT || 6600
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

const connect = () => {
    mongoose
        .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@videoappcluster.56uhguu.mongodb.net/?retryWrites=true&w=majority`)
        .then(() => {
            console.log("Connected to DB");
        })
        .catch((err) => {
            throw err;
        });
};

app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/videos', videoRouter)
app.use('/api/comments', commentRouter)

//ошибки
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Что-то пошло не так!";
    return res.status(status).json({
        success: false,
        status,
        message,
    });
});


app.listen(PORT, () => {
    connect();
    console.log("Connected to Server");
});



