import { IProduct } from "../../Types/Abstract";
import * as types from "../ActionTypes/Cart";

export interface IAction {
	type: string,
	payload: {
		product: IProduct
	}
}

let cart: IProduct[] = JSON.parse(localStorage.getItem("cart") as string) || [];

export const cartReducer = (state = cart, action: IAction): IProduct[] => {
	if (action.type === types.ADD) {
		cart.push(action.payload.product);
		localStorage.setItem("cart", JSON.stringify(cart));
		return cart;
	}
	else if (action.type === types.REMOVE) {
		cart.filter(item => item != action.payload.product);
		localStorage.setItem("cart", JSON.stringify(cart));
		return cart;
	}
	else if (action.type === types.CLEAR) {
		cart = [];
		localStorage.removeItem("cart");
		return cart;
	}
	else {
		return state;
	}
};
