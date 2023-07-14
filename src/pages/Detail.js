import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { addItem } from '../store';
import { useDispatch } from 'react-redux';

import { Context1 } from '../App';

export default function Detail({ shoes }) {
    let [alert, setAlert] = useState(true);
    let [tab, setTab] = useState(0);

    let { id } = useParams();
    let page = Number(id);
    let item = shoes.find((shoesItem) => shoesItem.id == id);
    //console.log(typeof id); ---> string
    const [fade2, setFade2] = useState('');
    let dispatch = useDispatch();

    useEffect(() => {
        // 그 페이지에 보이는 상품 id를 가져와서
        // localStorage에 watched 항목에 추가
        let getShoes = localStorage.getItem('watched');
        getShoes = JSON.parse(getShoes);
        getShoes.push(item.id);
        // 중복제거 Set
        getShoes = new Set(getShoes);
        getShoes = Array.from(getShoes);
        localStorage.setItem('watched', JSON.stringify(getShoes));
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setFade2('end');
        }, 100);
        let a = setTimeout(() => {
            setAlert(false);
        }, 2000);

        return () => {
            clearTimeout(a);
            setFade2('');
        };
    }, []);

    return (
        <div className={`container start ${fade2}`}>
            {alert === true ? <div className='alert alert-warning'>2초 이내 구매 시 할인</div> : null}

            <div className='row'>
                <div className='col-md-6'>
                    <img src={'https://codingapple1.github.io/shop/shoes' + (page + 1) + '.jpg'} width='100%' alt='img' />
                </div>
                <div className='col-md-6'>
                    <h4 className='pt-5'>{item.title}</h4>
                    <p>{item.content}</p>
                    <p>{item.price}</p>
                    <button
                        className='btn btn-danger'
                        onClick={() => {
                            dispatch(addItem({ id: item.id, name: item.title, count: 1 }));
                        }}
                    >
                        주문하기
                    </button>
                </div>
            </div>

            <Nav variant='tabs' defaultActiveKey='link0'>
                <Nav.Item>
                    <Nav.Link
                        onClick={() => {
                            setTab(0);
                        }}
                        eventKey='link0'
                    >
                        버튼0
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        onClick={() => {
                            setTab(1);
                        }}
                        eventKey='link1'
                    >
                        버튼1
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        onClick={() => {
                            setTab(2);
                        }}
                        eventKey='link2'
                    >
                        버튼2
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent tab={tab} shoes={shoes} />
        </div>
    );
}

function TabContent({ tab, shoes }) {
    let [fade, setFade] = useState('');

    useEffect(() => {
        setTimeout(() => {
            setFade('end');
        }, 100);

        return () => {
            setFade('');
        };
    }, [tab]);
    return <div className={`start ${fade}`}>{[<div>{shoes[tab].title}</div>, <div>{shoes[tab].title}</div>, <div>{shoes[tab].title}</div>][tab]}</div>;
    // if (tab == 0) {
    //     return <div>content0</div>;
    // } else if (tab == 1) {
    //     return <div>content1</div>;
    // } else if (tab == 2) {
    //     return <div>content2</div>;
    // }
}
