import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import app from "../firebase";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  background-color: ${({theme}) => theme.bgMenu};
  color: ${({theme}) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  border-radius: 3px;
`;
const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
const Title = styled.h1`
  text-align: center;
`;
const Label = styled.label`
  font-size: 16px;
  text-align: center;
`;
const Input = styled.input`
  border: 1px solid ${({theme}) => theme.soft};
  color: ${({theme}) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 999;
`;
const Description = styled.textarea`
  border: 1px solid ${({theme}) => theme.soft};
  color: ${({theme}) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({theme}) => theme.soft};
  color: ${({theme}) => theme.textSoft};
`;

const UploadPopup = ({setOpen}) => {
    const [img, setImg] = useState(undefined);
    const [video, setVideo] = useState(undefined);
    const [inputs, setInputs] = useState({});
    const [imgPer, setImgPer] = useState(0);
    const [videoPer, setVideoPer] = useState(0);
    const navigate = useNavigate();

    //для определения изменений всех инпутов сразу
    const handleChangeInput = (e) => {
        setInputs(prev => {
            return {...prev, [e.target.name]: e.target.value}
        });
    }

    const uploadFile = (file, urlType) => {
        const storage = getStorage(app);
        //без конфдикта создал уникальное название файла
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                urlType === "imgUrl" ? setImgPer(Math.round(progress)) : setVideoPer(Math.round(progress));
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                        break;
                }
            },
            (error) => {
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setInputs((prev) => {
                        return { ...prev, [urlType]: downloadURL };
                    });
                });
            }
        );
    }

    useEffect(() => {
        video && uploadFile(video, 'videoUrl');
    }, [video]);
    useEffect(() => {
        img && uploadFile(img, 'imgUrl');
    }, [img]);


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('/videos', {...inputs})
            setOpen(false)
            res.status === 200 ? navigate(`video/${res.data._id}`) : alert({message: 'Что-то пошло не так...'})
        }catch (e) {

        }
    }


    return (
        <Container>
            <Wrapper>
                <Close onClick={() => setOpen(false)}>X</Close>
                <Title>Загрузить новое видео</Title>
                <Label> Видео:</Label>
                {videoPer > 0 ? (
                    "Загрузка завершена!"
                ) : (
                        <Input
                            type='file'
                            accept='video/*'
                            onChange={(e) => setVideo(e.target.files[0])}
                        />
                    )}
                <Input
                    name='title'
                    type='text'
                    placeholder='Заголовок'
                    onChange={handleChangeInput}
                />
                <Description
                    name='desc'
                    placeholder='Описание'
                    onChange={handleChangeInput}
                />
                <Label> Изображение:</Label>
                {imgPer > 0 ? (
                    "Загрузка завершена!"
                ) : (
                <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImg(e.target.files[0])}
                />
                    )}
                <Button onClick={handleSubmit}>Загрузить</Button>
            </Wrapper>
        </Container>
    );
};

export default UploadPopup;