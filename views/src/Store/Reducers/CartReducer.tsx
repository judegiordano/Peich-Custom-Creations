import { IProduct } from "../../Types/Abstract";
import * as types from "../ActionTypes/Cart";
import { clearCartStorage, getCartStorage, updateCartStorage } from "../Storage/CartStorage";

export interface IAction {
	type: string,
	payload: {
		product: IProduct
	}
}

let cart: IProduct[] = getCartStorage() as IProduct[] || [];

export const cartReducer = (state = cart, action: IAction): IProduct[] => {
	if (action.type === types.ADD) {
		cart.push(action.payload.product);
		updateCartStorage(cart);
		return cart;
	}
	else if (action.type === types.REMOVE) {
		cart.filter(item => item != action.payload.product);
		updateCartStorage(cart);
		return cart;
	}
	else if (action.type === types.CLEAR) {
		cart = [];
		clearCartStorage();
		return cart;
	}
	else {
		return state;
	}
};
