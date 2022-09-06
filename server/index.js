import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routes/auth.js';
import userRouter from './routes/users.js';
import commentRouter from './routes/comments.js';
import videoRouter from './routes/videos.js';

const app = express();
dotenv.config();
app.use(express.json());

const PORT = process.env.PORT || 6666
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


app.listen(PORT, () => {
    connect();
    console.log("Connected to Server");
});



