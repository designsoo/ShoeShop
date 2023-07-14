import { memo, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { changeName, countUp } from '../store/userSlice';
import { addCount } from '../store';

let Child = memo(function () {
    console.log('재랜더링됨');
    return <div>자식임</div>;
});

export default function Cart() {
    let state = useSelector((state) => state);
    let dispatch = useDispatch();
    let [count, setCount] = useState(0);

    return (
        <>
            <Child count={count}></Child>
            <button
                onClick={() => {
                    setCount(count + 1);
                }}
            >
                +
            </button>
            <h6>
                {state.user.name}의 장바구니 입니다.
                {state.user.age}
            </h6>
            <button
                onClick={() => {
                    dispatch(countUp(10));
                }}
            >
                수정버튼
            </button>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {state.cart.map((cartItem, i) => (
                        <tr key={i}>
                            <td>{state.cart[i].id}</td>
                            <td>{state.cart[i].name}</td>
                            <td>{state.cart[i].count}</td>
                            <td>
                                <button
                                    onClick={() => {
                                        dispatch(addCount(state.cart[i].id));
                                    }}
                                    className='btn btn-danger'
                                >
                                    +
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}
