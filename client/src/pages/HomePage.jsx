import React from 'react';
import styled from "styled-components";
import CardItem from "../components/CardItem";


const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;


const HomePage = () => {
    return (
        <Container>
            <CardItem/>
            <CardItem/>
            <CardItem/>
            <CardItem/>
            <CardItem/>
            <CardItem/>
        </Container>
    );
};

export default HomePage;
