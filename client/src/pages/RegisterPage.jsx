import React, {useState} from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;


const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
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

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;


const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <Container>
            <Wrapper>
                <Title>Регистрация</Title>
                <Input placeholder="Имя" onChange={(e) => setName(e.target.value)}/>
                <Input placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
                <Input type="password" placeholder="Пароль" onChange={(e) => setPassword(e.target.value)}/>
                <Button>Создать</Button>
            </Wrapper>
            <More>
                 <Link to='/login'> Уже есть аккаунт?</Link>
            </More>
        </Container>
    )
};

export default RegisterPage;
