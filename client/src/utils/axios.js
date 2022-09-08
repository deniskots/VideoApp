import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:6600/api/'
});

//проверяет каждый раз есть ли токен в локал сторэдж добавляй в ауторизатион
instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token')
    return config
})

export default instance;