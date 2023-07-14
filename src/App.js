import './App.css';
import { lazy, Suspense, createContext, useEffect, useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import data from './data';
import Home from './pages/Home';
// import Detail from './pages/Detail';
// import Cart from './pages/Cart';
const Detail = lazy(() => import('./pages/Detail'));
const Cart = lazy(() => import('./pages/Cart'));

// Context API
//let Context1 = createContext();
 
function App() {
    useEffect(() => {
        localStorage.setItem('watched', JSON.stringify([]));
    }, []);

    let [shoes, setShoes] = useState(data);
    let navigate = useNavigate();

    let result = useQuery(
        ['data'],
        () =>
            axios.get('https://codingapple1.github.io/userdata.json').then((a) => {
                return a.data;
            }),
        { staleTime: 2000 }
    );

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
                                navigate('/cart');
                            }}
                        >
                            Cart
                        </Nav.Link>
                    </Nav>
                    <Nav className='ms-auto'>
                        {result.isLoading && '로딩중'}
                        {result.error && '에러남'}
                        {result.data && result.data.name}
                    </Nav>
                </Container>
            </Navbar>

            <Suspense fallback={<div>Loading....</div>}>
                <Routes>
                    <Route path='/' element={<Home shoes={shoes} setShoes={setShoes} />} />
                    <Route path='/detail/:id' element={<Detail shoes={shoes} />} />
                    <Route path='/cart' element={<Cart />} />
                </Routes>
            </Suspense>
        </div>
    );
}

export default App;
