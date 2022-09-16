import React, {useState} from 'react';
import styled from "styled-components";

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
  background-color: ${({ theme }) => theme.bgMenu};
  color: ${({ theme }) => theme.text};
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
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 999;
`;
const Description = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
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
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const UploadPopup = ({setOpen}) => {
    const [img, setImg] = useState(undefined);
    const [video, setVideo] = useState(undefined);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    return (
        <Container>
            <Wrapper>
                <Close onClick={() => setOpen(false)}>X</Close>
                <Title>Загрузить новое видео</Title>
                <Label> Видео:</Label>
                <Input
                    type='file'
                    accept='video/*'
                    onChange={(e) => setVideo(e.target.files[0])}
                />
                <Input
                    type='text'
                    placeholder='Заголовок'
                    onChange={e => setTitle(e.target.value)}
                />
                <Description
                    placeholder='Описание'
                    onChange={e => setDesc(e.target.value)}
                />
                <Label> Изображение:</Label>
                <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImg(e.target.files[0])}
                />
                <Button>Загрузить</Button>
            </Wrapper>
        </Container>
    );
};

export default UploadPopup;