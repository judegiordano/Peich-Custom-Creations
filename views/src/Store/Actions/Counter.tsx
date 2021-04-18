import * as types from "../ActionTypes/Counter";
import { IAction } from "../Reducers/CounterReducer";

export const countAdd = (amount:number): IAction => ({
	type: types.ADD,
	payload: {
		amount
	}
});

export const countSubtract = (amount:number): IAction => ({
	type: types.SUBTRACT,
	payload: {
		amount
	}
});

export const countReset = (): IAction => ({
	type: types.RESET,
	payload: {
		amount: 0
	}
});