import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import CardItem from "../components/CardItem";
import axios from "../utils/axios";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;


const HomePage = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            const res = await axios.get('/videos/random')
            setVideos(res.data)
        }
        fetchVideos();
    }, []);

    return (
        <Container>
            {videos.map((video) => <CardItem video={video}/>)}

        </Container>
    );
};

export default HomePage;
