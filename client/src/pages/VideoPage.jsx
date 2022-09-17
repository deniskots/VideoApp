import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import SentimentVerySatisfiedOutlinedIcon from '@mui/icons-material/SentimentVerySatisfiedOutlined';
import InsertEmoticonTwoToneIcon from '@mui/icons-material/InsertEmoticonTwoTone';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';
import SentimentDissatisfiedTwoToneIcon from '@mui/icons-material/SentimentDissatisfiedTwoTone';
import Comments from "../components/Comments";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {dislike, fetchRemovePost, fetchSuccess, like} from "../redux/slices/videoSlice";
import Moment from "react-moment";
import {sub} from "../redux/slices/userSlice";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


const Container = styled.div`
  display: flex;
  gap: 20px;
  padding: 30px 0px;
  @media (max-width: 1400px) {
    display: flex;
    flex-direction: column;
  };
  @media (max-width: 1200px) {

  }
`;

const Content = styled.div`
  flex: 5;
`;


const VideoWrapper = styled.div`
flex: 5`;

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({theme}) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({theme}) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({theme}) => theme.text};
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
  border: 0.5px solid ${({theme}) => theme.soft};
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
  color: ${({theme}) => theme.text};
`;

const UserName = styled.span`
  font-weight: 500;
`;

const UserCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({theme}) => theme.textSoft};
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
    const [channel, setChannel] = useState({});
    const currentUser = useSelector(state => state.user.data);
    const currentVideo = useSelector(state => state.video.data);
    const dispatch = useDispatch();
    //достать айди
    //const {id} = useParams()
    const path = useLocation().pathname.split('/')[2];
    const navigate = useNavigate()



    useEffect(() => {
        const fetchData = async () => {
            try {
                const resVideos = await axios.get(`/videos/find/${path}`)
                const resChannels = await axios.get(`/users/find/${resVideos.data.userId}`);
                setChannel(resChannels.data)
                dispatch(fetchSuccess(resVideos.data));
            } catch (e) {
                console.log(e)
            }
        }
        fetchData()
    }, [path, dispatch]);

    const handleLike = async () => {
        await axios.put(`/users/like/${currentVideo._id}`)
        dispatch(like(currentUser._id))
    }
    const handleDislike = async () => {
        await axios.put(`/users/dislike/${currentVideo._id}`)
        dispatch(dislike(currentUser._id))
    }
    const handleSub = async () => {
        currentUser.subscribedUsers.includes(channel._id)
            ? await axios.put(`/users/unsub/${channel._id}`)
            : await axios.put(`/users/sub/${channel._id}`)
        dispatch(sub(channel._id))
    }

    const onClickRemove = async () => {
        await axios.delete(`/videos/${path}`)
        navigate('/')
    };

    return (
        <Container>
            <Content>
                <VideoWrapper>
                    <VideoFrame src={currentVideo.videoUrl} controls/>
                </VideoWrapper>
                <Title> {currentVideo.title}</Title>
                <Details>
                    <Info>
                        {currentVideo.views} просмотров •
                        <Moment date={currentVideo.createdAt} format='D MMM YYYY'/>
                    </Info>
                    <Buttons>
                        <Button onClick={handleLike}>
                            {
                                currentVideo.likes?.includes(currentUser._id) ? (
                                    <InsertEmoticonTwoToneIcon/>
                                ) : (
                                    <SentimentVerySatisfiedOutlinedIcon/>
                                )}
                            {currentVideo.likes?.length}
                        </Button>
                        <Button onClick={handleDislike}>
                            {
                                currentVideo.dislikes?.includes(currentUser._id) ? (
                                    <SentimentDissatisfiedTwoToneIcon/>
                                ) : (
                                    <SentimentDissatisfiedOutlinedIcon/>
                                )}
                            {currentVideo.dislikes?.length}
                        </Button>
                        {
                            currentUser._id === currentVideo.userId && <Button onClick={onClickRemove}><DeleteOutlineIcon/></Button>
                        }

                    </Buttons>
                </Details>
                <Hr/>
                <User>
                    <UserInfo>
                        <Image src={channel.img}/>
                        <UserDetail>
                            <UserName>{channel.fullName}</UserName>
                            <UserCounter>{channel.subscribers} подписчиков</UserCounter>
                            <Description>
                                {currentVideo.desc}
                            </Description>
                        </UserDetail>
                    </UserInfo>
                    <Subscribe onClick={handleSub}>
                        {
                            currentUser.subscribedUsers?.includes(channel._id) ? 'Вы уже добавили' : 'Добавить'
                        }
                    </Subscribe>
                </User>
            </Content>
            <Recommend>
                Коментарии:
                <Comments videoId={currentVideo._id}/>
            </Recommend>
        </Container>
    );
};

export default VideoPage;
