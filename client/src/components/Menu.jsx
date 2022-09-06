import React from 'react';
import styled from "styled-components";
import logo from '../assets/img/logo.svg'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import {Link} from "react-router-dom";



const Container = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.bgMenu};
  height: 100vh;
  position: sticky;
  top: 0;
  font-size: 16px;
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  padding: 10px 25px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const LogoImg = styled.img`
  width: 40px;
`;

const List = styled.div`
  margin-top: 70px;;
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 10px 0px;
  
  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div``;

const LoginBtn = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #ff3e5b;
  color: #ff3e5b;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Menu = () => {


    return (
        <Container>
            <Wrapper>
                <Link to='/' style={{textDecoration: 'none', color: 'inherit'}}>
                    <Logo>
                        <LogoImg src={logo}/>
                        Create
                    </Logo>
                </Link>
                <ListItem>
                    <HomeOutlinedIcon/>
                    Главная
                </ListItem>
                <ListItem>
                    <ExploreOutlinedIcon />
                    Новигация
                </ListItem>
                <ListItem>
                    <SubscriptionsOutlinedIcon />
                    Ваши подписки
                </ListItem>
                <Hr/>

                <Login>
                    Для полного использования необходимо зайти в свой профиль
                    <Link to='login' style={{textDecoration: 'none', color: 'inherit'}}>
                        <LoginBtn> Ввойти</LoginBtn>
                    </Link>
                </Login>
            </Wrapper>
        </Container>
    );
};

export default Menu;
