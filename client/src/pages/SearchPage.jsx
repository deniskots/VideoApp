import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import CardItem from "../components/CardItem";
import axios from "axios";
import {useLocation} from "react-router-dom";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  };
  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    //grid-template-columns: repeat(1, 1fr);
  }
`;



const SearchPage = () => {
    const [videos, setVideos] = useState([]);
    const query = useLocation().search;


    useEffect(() => {
        const fetchVideos = async () => {
            const res = await axios.get(`/videos/search${query}`);
            setVideos(res.data);
        };
        fetchVideos();
    }, [query]);


    return (
        <Container>
            {videos.map(video=>(
                <CardItem key={video._id} video={video}/>
            ))}
        </Container>
    );
};

export default SearchPage;
