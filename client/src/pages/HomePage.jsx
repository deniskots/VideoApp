import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import CardItem from "../components/CardItem";
import axios from "../utils/axios";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
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
            {videos.map((video) => <CardItem key={video.id} video={video}/>)}
        </Container>
    );
};

export default HomePage;
