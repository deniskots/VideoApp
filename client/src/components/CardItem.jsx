import React from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";


const Container = styled.div`
  width: 360px;
  margin-bottom: 25px;
`;

const Img = styled.img`
  width: 100%;
  height: 170px;
  background-color: green;
`;

const Details = styled.div`
  display: flex;
  margin-top: 15px;
  gap: 12px;
  flex: 1;
`;

const UserImg = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const UserName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;
const CardItem = () => {
    return (
            <Link to='/video/test' style={{textDecoration: 'none'}}>
            <Container>
                <Img/>
                <Details>
                    <UserImg/>
                    <Texts>
                        <Title>Test Video</Title>
                        <UserName>Test Test</UserName>
                        <Info>111111 просмотров • 2 дня назад</Info>
                    </Texts>
                </Details>
            </Container>
        </Link>
    );
};

export default CardItem;
