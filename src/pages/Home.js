import { Button } from 'react-bootstrap';
import React, { useState } from 'react';
import bg from '../bg.png';
import ShoesItems from '../components/shoesItems';
import axios from 'axios';

export default function Home({ shoes, setShoes }) {
    const [click, setClick] = useState(1);

    return (
        <>
            <div className='main-bg' style={{ backgroundImage: 'url(' + bg + ')' }}></div>
            <div className='container'>
                <div className='row'>
                    {shoes.map((shoesItem, i) => (
                        <ShoesItems key={shoesItem.id} i={i} title={shoesItem.title} price={shoesItem.price} />
                    ))}
                </div>
                {click <= 3 ? (
                    <Button
                        variant='primary'
                        onClick={() => {
                            setClick((prev) => prev + 1);
                            axios
                                .get(`https://codingapple1.github.io/shop/data${click}.json`)
                                .then((result) => {
                                    let copy = [...shoes, ...result.data];
                                    setShoes(copy);
                                })
                                .catch(() => {
                                    console.log('실패했습니다.');
                                });
                        }}
                    >
                        more
                    </Button>
                ) : null}
            </div>
        </>
    );
}
