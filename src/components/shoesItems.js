import React from 'react';
export default function ShoesItems({ i, title, price }) {
    return (
        <div className='col-md-4'>
            <img src={'https://codingapple1.github.io/shop/shoes' + (i + 1) + '.jpg'} alt={'shoes' + (i + 1)} width='60%' />
            <h4>{title}</h4>
            <p>{price}</p>
        </div>
    );
}
