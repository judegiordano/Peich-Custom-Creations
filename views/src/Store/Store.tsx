import { createStore, combineReducers } from "redux";

import { CountReducer } from "./Reducers/CounterReducer";

const reducers = combineReducers({
	count: CountReducer
});

export const store = createStore(reducers);