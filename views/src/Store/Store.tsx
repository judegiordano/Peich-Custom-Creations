import { createStore, combineReducers } from "redux";

import { cartReducer } from "./Reducers/CartReducer";

const reducers = combineReducers({
	cart: cartReducer
});

export type RootState = ReturnType<typeof reducers>;

export const store = createStore(reducers);

export type AppDispatch = typeof store.dispatch;