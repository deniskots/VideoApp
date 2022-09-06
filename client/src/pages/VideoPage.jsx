import React from 'react';
import styled from "styled-components";
import SentimentVerySatisfiedOutlinedIcon from '@mui/icons-material/SentimentVerySatisfiedOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';
import Comments from "../components/Comments";

const Container = styled.div`
  display: flex;
  gap: 20px;
  padding: 30px 0px;
`;

const Content = styled.div`
  flex: 3;
`;


const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Recommend = styled.div`
  flex: 4;
`;

const Hr = styled.hr`
  margin: 20px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const User = styled.div`
  display: flex;
  justify-content: space-between;
`;

const UserInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const UserDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const UserName = styled.span`
  font-weight: 500;
`;

const UserCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #007ecc;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;


const VideoPage = () => {
    return (
        <Container>
            <Content>
                <VideoWrapper>
                    <iframe
                        width="100%"
                        height="400"
                        src="https://www.youtube.com/embed/k3Vfj-e1Ma4"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </VideoWrapper>
                <Title> Название видео</Title>
                <Details>
                    <Info> кол-во просмотров</Info>
                    <Buttons>
                        <Button><SentimentVerySatisfiedOutlinedIcon/></Button>
                        <Button><SentimentDissatisfiedOutlinedIcon/></Button>
                        <Button><ReplyOutlinedIcon/></Button>
                    </Buttons>
                </Details>
                <Hr/>
                <User>
                    <UserInfo>
                        <Image />
                        <UserDetail>
                            <UserName>Test</UserName>
                            <UserCounter>200K subscribers</UserCounter>
                            <Description>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                Doloribus laborum delectus unde quaerat dolore culpa sit aliquam
                                at. Vitae facere ipsum totam ratione exercitationem. Suscipit
                                animi accusantium dolores ipsam ut.
                            </Description>
                        </UserDetail>
                    </UserInfo>
                    <Subscribe>Добавить</Subscribe>
                </User>
            </Content>
            <Recommend>
                Коментарии:
                <Comments/>

            </Recommend>

        </Container>
    );
};

export default VideoPage;
