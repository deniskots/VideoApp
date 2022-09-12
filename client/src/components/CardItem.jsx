import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";
import Moment from "react-moment";
import axios from "axios";



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
const CardItem = ({type, video}) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users/find/${video.userId}`)
            setUser(res.data)
        }
        fetchUser();
    }, [video.userId]);

    return (
            <Link to={`/video/${video._id}`} style={{textDecoration: 'none'}}>
            <Container type={type}>
                <Img type={type} src={video.imgUrl}/>
                <Details type={type}>
                    <UserImg type={type} src={user.img}/>
                    <Texts>
                        <Title>{video.title}</Title>
                        <UserName>{user.fullName}</UserName>
                        <Info>
                            {video.views} просмотров • <Moment date={video.createdAt} format='D MMM YYYY'/>
                        </Info>
                    </Texts>
                </Details>
            </Container>
        </Link>
    );
};

export default CardItem;
