import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Detail({ shoes }) {
    useEffect(() => {
        let a = setTimeout(() => {
            setAlert(false);
        }, 2000);
        console.log(2);

        return () => {
            clearTimeout(a);
            console.log(1);
            // Clean up function
            // 'useEffect 동작 전에 실행됨'
        };
    }, []);
    // 1. 재렌더링마다 코드 실행하고 싶으면 : useEffect(() => { })
    // 2. mount시 1회 실행하고 싶으면 :  useEffect(() => { },[])
    // 3. numount시 1회 사용하고 싶으면 : useEffect(() => { return () => { 여기에 적어 } },[])
    // 4. useEffect 실행 전에 실행하고 싶으면 : return()=>{}
    // 5. 특정 state 변경시에만 실행하고 싶으면 [state명] : useEffect(() => { },[count])

    let [count, setCount] = useState(0);
    let [alert, setAlert] = useState(true);

    const countUp = () => {
        setCount((prev) => prev + 1);
    };

    let { id } = useParams();
    let page = Number(id);
    let item = shoes.find((shoesItem) => shoesItem.id == id);
    //console.log(typeof id); ---> string

    return (
        <div className='container'>
            {alert == true ? <div className='alert alert-warning'>2초 이내 구매 시 할인</div> : null}

            {count}
            <button onClick={countUp}>버튼</button>
            <div className='row'>
                <div className='col-md-6'>
                    <img src={'https://codingapple1.github.io/shop/shoes' + (page + 1) + '.jpg'} width='100%' alt='img' />
                </div>
                <div className='col-md-6'>
                    <h4 className='pt-5'>{item.title}</h4>
                    <p>{item.content}</p>
                    <p>{item.price}</p>
                    <button className='btn btn-danger'>주문하기</button>
                </div>
            </div>
        </div>
    );
}
