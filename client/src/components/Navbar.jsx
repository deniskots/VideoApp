import React, {useState} from 'react';
import styled from "styled-components";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import ModeNightOutlinedIcon from '@mui/icons-material/ModeNightOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../redux/slices/userSlice";
import logo from "../assets/img/logo.svg";
import UploadPopup from "./UploadPopup";

const Container = styled.div`
  width: 100%;
  padding: 5px 0px;
  border-bottom: 1px solid #949292;
  background-color: ${({theme}) => theme.bgMenu};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 5px 20px;
  position: relative;
`;

const SearchPart = styled.div`
  width: 40%;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #626161;
  border-radius: 4px;
  cursor: pointer;
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

const UserPart = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  font-weight: 500;
  color: ${({theme}) => theme.text};
  &:hover {
    cursor: pointer;
  }
`;
const UserImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: coral;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
  
`;

const LogoImg = styled.img`
  width: 40px;
`;

const Login = styled.div``;

const LoginBtn = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #ff3e5b;
  color: #ff3e5b;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Navbar = ({darkTheme, setDarkTheme}) => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const {data} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleThemeChange = () => {
        setDarkTheme(!darkTheme)
    };

    const onClickLogout = () => {
        if (window.confirm('???? ?????????????????????????? ???????????? ???????????')) {
            dispatch(logout())
            navigate('/login')
        }

    };

    const handleSearch = () => {
        navigate(`/search?q=${query}`)
        setQuery('')
    }

    return (
        <>
        <Container>
            <Wrapper>
                <Link to='/' style={{textDecoration: 'none', color: 'inherit'}}>
                    <Logo>
                        <LogoImg src={logo}/>
                        Create
                    </Logo>
                </Link>
                <SearchPart>
                    <SearchInput
                        placeholder='??????????'
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <SearchOutlinedIcon onClick={handleSearch}/>
                </SearchPart>
                {
                    data ? (
                        <UserPart>
                            <FileUploadIcon onClick={() => setOpen(true)} style={{color: 'red'}}/>
                            {/*<UserImg/>*/}
                            {data.fullName}
                            <NavbarBtn onClick={onClickLogout}>
                                <LogoutIcon/>
                            </NavbarBtn>
                        </UserPart>
                    ) : (
                        <>
                            <Login>
                                <Link to='login' style={{textDecoration: 'none', color: 'inherit'}}>
                                    <LoginBtn> ????????????</LoginBtn>
                                </Link>
                            </Login>
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
            {
                open && <UploadPopup setOpen={setOpen}/>
            }
        </>
    );
};

export default Navbar;
