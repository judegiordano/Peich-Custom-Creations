import { createStore, combineReducers } from "redux";

import { cartReducer } from "./Reducers/CartReducer";

const reducers = combineReducers({
	cart: cartReducer
});

export const store = createStore(reducers);