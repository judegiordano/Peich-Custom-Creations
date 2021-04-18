import { IProduct } from "../../Types/Abstract";
import * as types from "../ActionTypes/Cart";

export interface IAction {
	type: string,
	payload: {
		product: IProduct
	}
}

let cart: IProduct[] = [];

export const cartReducer = (state = cart, action: IAction): IProduct[] => {
	if (action.type === types.ADD) {
		cart.push(action.payload.product);
		return cart;
	}
	else if (action.type === types.REMOVE) {
		cart.filter(item => item != action.payload.product);
		return cart;
	}
	else if (action.type === types.CLEAR) {
		cart = [{} as IProduct];
		return cart;
	}
	else {
		return state;
	}
};
