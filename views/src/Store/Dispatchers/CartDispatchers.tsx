import { store } from "../Store";
import { cartAdd, cartClear, cartRemove, cartClearOne } from "../Actions/Cart";
import { ICartProduct } from "../../Types/Abstract";

export const AddToCart = (product: ICartProduct): void => {
	store.dispatch(cartAdd(product));
};

export const RemoveFromCart = (product: ICartProduct): void => {
	store.dispatch(cartRemove(product));
};

export const ClearOne = (product: ICartProduct): void => {
	store.dispatch(cartClearOne(product));
};

export const ClearCart = (): void => {
	store.dispatch(cartClear());
};

export const GetCart = (): { cart: ICartProduct[] } => {
	return store.getState();
};