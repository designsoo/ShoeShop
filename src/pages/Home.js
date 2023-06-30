import React from 'react';
import bg from '../bg.png';
import ShoesItems from '../components/shoesItems';

export default function Home({ shoes }) {
    return (
        <>
            <div className='main-bg' style={{ backgroundImage: 'url(' + bg + ')' }}></div>
            <div className='container'>
                <div className='row'>
                    {shoes.map((shoesItem, i) => (
                        <ShoesItems key={shoesItem.id} i={i} title={shoesItem.title} price={shoesItem.price} />
                    ))}
                </div>
            </div>
        </>
    );
}
