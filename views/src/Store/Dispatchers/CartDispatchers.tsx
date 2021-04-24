import { store, RootState } from "../Store";
import { ICartProduct } from "../../Types/Abstract";

export const GetCart = (): { cart: ICartProduct[] } => {
	return store.getState();
};

export const CartCountSelector = (state: RootState): number => {
	let count = 0;
	state.cart.forEach(item => count += item.quantity);
	return count;
};