import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import CardItem from "../components/CardItem";
/*import axios from "../utils/axios";*/
import {useDispatch, useSelector} from "react-redux";
import {fetchVideos} from "../redux/slices/videoSlice";
import axios from "axios";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  @media (max-width: 1400px) {
    grid-template-columns: repeat(3, 1fr);
  };
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  /*display: flex;
  justify-content: space-between;
  flex-wrap: wrap;*/
`;


const HomePage = ({type}) => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            const res = await axios.get(`/videos/${type}`)
            setVideos(res.data)
        }
        fetchVideos();
    }, [type]);

    return (
        <Container>
            {videos.map((video, index) => <CardItem key={index} video={video}/>)}
        </Container>
    );
};

export default HomePage;
