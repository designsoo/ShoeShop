import './App.css';
import { useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import data from './data';
import Home from './pages/Home';
import Detail from './pages/Detail';

function App() {
    let [shoes] = useState(data);
    let navigate = useNavigate();

    return (
        <div className='App'>
            <Navbar bg='primary' data-bs-theme='dark'>
                <Container>
                    <Navbar.Brand href='#home'>ShoeShop</Navbar.Brand>
                    <Nav className='me-auto'>
                        <Nav.Link
                            onClick={() => {
                                navigate('/');
                            }}
                        >
                            Home
                        </Nav.Link>
                        <Nav.Link
                            onClick={() => {
                                navigate('/detail');
                            }}
                        >
                            Detail
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <Routes>
                <Route path='/' element={<Home shoes={shoes} />} />
                <Route path='/detail/:id' element={<Detail shoes={shoes} />} />
                {/* Nested Routes : 여러 유사한 페이지 필요할 때 사용
                화면 어디에 보여줄지 적어줘야함 ==> nested routes의 element를 보여주는 곳은 <Outlet> */}
                <Route path='/about' element={<About />}>
                    <Route path='member' element={<div>member 소개 페이지</div>} />
                    <Route path='location' element={<div>location 소개 페이지</div>} />
                </Route>
                <Route path='/event' element={<Event />}>
                    <Route path='one' element={<p>첫 주문시 양배추즙 서비스</p>} />
                    <Route path='two' element={<p>생일기념 쿠폰 받기</p>} />
                </Route>
                <Route path='*' element={<div>404 없는 페이지입니다.</div>} />
            </Routes>
        </div>
    );
}
function About() {
    return (
        <>
            <h4>회사 정보</h4>
            <Outlet></Outlet>
        </>
    );
}

function Event() {
    return (
        <>
            <h4>오늘의 이벤트</h4>
            <Outlet></Outlet>
        </>
    );
}
export default App;
