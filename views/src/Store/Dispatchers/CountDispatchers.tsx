import { store } from "../Store";
import { countAdd, countReset, countSubtract } from "../Actions/Counter";

export const add = (amount = 1): void => {
	store.dispatch(countAdd(amount));
};

export const subtract = (amount = 1): void => {
	store.dispatch(countSubtract(amount));
};

export const reset = (): void => {
	store.dispatch(countReset());
};

export const getCount = (): { count: number } => {
	return store.getState();
};