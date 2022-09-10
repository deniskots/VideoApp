import React from 'react';
import styled from "styled-components";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import ModeNightOutlinedIcon from '@mui/icons-material/ModeNightOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../redux/slices/userSlice";

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

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  color: ${({theme}) => theme.text};
`;
const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: coral;
`;


const Navbar = ({darkTheme, setDarkTheme}) => {
    const currentUser = useSelector(state => state.user.data);
    const dispatch = useDispatch();

    const handleThemeChange = () => {
        setDarkTheme(!darkTheme)
    };

    const onClickLogout = () => {
        if (window.confirm('Вы действительно хотите выйти?')) {
            dispatch(logout())
        }
    };

    return (
        <Container>
            <Wrapper>
                <SearchPart>
                    <SearchInput placeholder='Поиск'></SearchInput>
                    <SearchOutlinedIcon/>
                </SearchPart>

                {
                    currentUser ? (
                        <User>
                            <FileUploadIcon style={{color: 'red'}}/>
                            <Avatar/>
                            {currentUser.name}
                            <NavbarBtn onClick={onClickLogout}>
                                <LogoutIcon/>
                            </NavbarBtn>
                        </User>
                    ) : (
                        <>
                            <Link to='login' style={{textDecoration: 'none', color: 'inherit'}}>
                                <NavbarBtn>
                                    <AccountCircleOutlinedIcon/>
                                </NavbarBtn>
                            </Link>
                        </>

                    )

                }
                <NavbarBtn onClick={handleThemeChange}>
                    {
                        darkTheme ? <LightModeOutlinedIcon/> : <ModeNightOutlinedIcon/>
                    }
                </NavbarBtn>


            </Wrapper>
        </Container>
    );
};

export default Navbar;
