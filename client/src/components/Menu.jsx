import React from 'react';
import styled from "styled-components";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import {Link} from "react-router-dom";

const Container = styled.div`
  margin-top: 5px;
  margin-bottom: 25px;
  font-size: 16px;
  color: ${({theme}) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px 8px;
  &:hover {
    border-radius: 5px;
    background-color: ${({theme}) => theme.soft};
  }
`;


const Menu = () => {
    return (
        <Container>
            <Wrapper>
                <Link to='/' style={{textDecoration: 'none', color: 'inherit'}}>
                    <ListItem>
                        <HomeOutlinedIcon/>
                        Главная
                    </ListItem>
                </Link>
                <Link to='/trends' style={{textDecoration: 'none', color: 'inherit'}}>
                    <ListItem>
                        <ExploreOutlinedIcon/>
                        Новигация
                    </ListItem>
                </Link>
                <Link to='/sub' style={{textDecoration: 'none', color: 'inherit'}}>
                    <ListItem>
                        <SubscriptionsOutlinedIcon/>
                        Ваши подписки
                    </ListItem>
                </Link>
            </Wrapper>
        </Container>
    );
};

export default Menu;
