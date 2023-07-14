import { configureStore, createSlice } from '@reduxjs/toolkit';
import user from './store/userSlice';

// State 역할
let cart = createSlice({
    name: 'cart',
    initialState: [
        { id: 0, name: 'White and Black', count: 2 },
        { id: 2, name: 'Grey Yordan', count: 1 },
    ],
    reducers: {
        addCount(state, action) {
            let shoesNum = state.findIndex((item) => {
                return item.id === action.payload;
            });
            state[shoesNum].count++;
        },
        addItem(state, action) {
            state.push(action.payload);
        },
    },
});

export let { addCount, addItem } = cart.actions;

export default configureStore({
    reducer: {
        user: user.reducer,
        cart: cart.reducer,
    },
});
