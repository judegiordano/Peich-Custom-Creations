import { ICartProduct } from "../../Types/Abstract";
import * as types from "../ActionTypes/Cart";
import { clearCartStorage, getCartStorage, updateCartStorage } from "../Storage/CartStorage";

export interface IAction {
	type: string,
	payload: {
		product: ICartProduct
	}
}

let cart: ICartProduct[] = getCartStorage() as ICartProduct[] || [];

export const cartReducer = (state = cart, action: IAction): ICartProduct[] => {
	if (action.type === types.ADD) {
		const exists = cart.findIndex(a => a.id === action.payload.product.id);
		if(exists >= 0) {
			cart[exists].quantity += 1;
			updateCartStorage(cart);
			return cart;
		}
		cart.push(action.payload.product);
		updateCartStorage(cart);
		return cart;
	}
	else if (action.type === types.REMOVE) {
		const exists = cart.findIndex(a => a.id === action.payload.product.id);
		if(exists && cart[exists].quantity > 1) {
			cart[exists].quantity -= 1;
			updateCartStorage(cart);
			return cart;
		}
		cart = cart.filter(item => item != action.payload.product);
		updateCartStorage(cart);
		return cart;
	}
	else if (action.type === types.CLEARONE) {
		cart = cart.filter(item => item != action.payload.product);
		updateCartStorage(cart);
		return cart;
	}
	else if (action.type === types.CLEAR) {
		cart = [];
		clearCartStorage();
		return cart;
	}
	else return state;
};
