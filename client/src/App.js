import styled, {ThemeProvider} from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import {darkThemeMode, lightThemeMode} from "./utils/ThemeMode";
import {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import VideoPage from "./pages/VideoPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import {useDispatch, useSelector} from "react-redux";
import {selectIsAuth} from "./redux/slices/userSlice";



const Container = styled.div`
  display: flex;
`;

const Main = styled.div`
  flex: 8;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};

`;

const Wrapper = styled.div`
padding: 18px 70px;
`;


function App() {
    const [darkTheme, setDarkTheme] = useState(false);
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth)

    return (
        <ThemeProvider theme={darkTheme ? darkThemeMode : lightThemeMode}>
            <Container>
                <Menu/>
                <Main>
                    <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme}/>
                    <Wrapper>
                        <Routes>
                            <Route path='/'>
                                <Route index element={<HomePage type='all'/>}/>
                                <Route path='trends' element={<HomePage type='trend'/>}/>
                                <Route path='sub' element={<HomePage type='sub'/>}/>
                                <Route path='login' element={<LoginPage/>}/>
                                <Route path='register' element={<RegisterPage/>}/>
                                <Route path='video'>
                                    <Route path=':id' element={<VideoPage/>}></Route>
                                </Route>
                            </Route>
                        </Routes>
                    </Wrapper>
                </Main>
            </Container>
        </ThemeProvider>

    );
}

export default App;
