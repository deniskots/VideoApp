import React from 'react';
import styled from "styled-components";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import ModeNightOutlinedIcon from '@mui/icons-material/ModeNightOutlined';
import {Link} from "react-router-dom";

const Container = styled.div`
  height: 50px;
  position: sticky;
  top: 0;
  background-color: ${({theme}) => theme.bgMenu};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const SearchPart = styled.div`
  width: 40%;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #626161;
  border-radius: 4px;
`;

const SearchInput = styled.input`
  border: none;
  background-color: transparent;
  &:focus {
    outline: none;
  }
`;

const NavbarBtn = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: none;
  color: #3e98ff;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Navbar = ({darkTheme, setDarkTheme}) => {
    const handleThemeChange = () => {
        setDarkTheme(!darkTheme)
    }

    return (
        <Container>
            <Wrapper>
                <SearchPart>
                    <SearchInput placeholder='Поиск'></SearchInput>
                    <SearchOutlinedIcon/>
                </SearchPart>
                <NavbarBtn onClick={handleThemeChange}>
                    {
                        darkTheme ? <LightModeOutlinedIcon/> : <ModeNightOutlinedIcon/>
                    }
                </NavbarBtn>
                <Link to='login' style={{textDecoration: 'none', color: 'inherit'}}>
                    <NavbarBtn>
                        <AccountCircleOutlinedIcon/>
                    </NavbarBtn>
                </Link>

            </Wrapper>
        </Container>
    );
};

export default Navbar;
