import React, {useState} from 'react';
import styled from "styled-components";
import {Link, Navigate} from "react-router-dom";
import axios from "../utils/axios";
import {fetchLogin, selectIsAuth} from "../redux/slices/authSlice";
import {useDispatch, useSelector} from "react-redux";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({theme}) => theme.text};
`;

const Wrapper = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: transparent;
  border: 1px solid ${({theme}) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const Input = styled.input`
  border: 1px solid ${({theme}) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({theme}) => theme.text};
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

const More = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  font-size: 12px;
  color: ${({theme}) => theme.textSoft};
`;


const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth)

    console.log(isAuth)


    const onSubmit = async () => {
        const data = await dispatch(fetchLogin({email, password}));
        if (!data.payload) {
            return alert('Не получилось!')
        }
        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token)
        }
    }

    if (isAuth) {
        return <Navigate to="/"/>
    }
    return (
        <Container>
            <Wrapper onSubmit={(e) => e.preventDefault()}>
                <Title>Авторизация</Title>
                <Input
                    placeholder="почта"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="пароль"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button onClick={onSubmit}> Ввойти</Button>
            </Wrapper>
            <More>
                Нет аккаунта? <Link to='/register'> создайте его</Link>
            </More>
        </Container>
    );
};

export default LoginPage;
