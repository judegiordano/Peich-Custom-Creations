import { store } from "../Store";
import { cartAdd, cartClear, cartRemove } from "../Actions/Cart";
import { IProduct } from "../../Types/Abstract";

export const AddToCart = (product: IProduct): void => {
	store.dispatch(cartAdd(product));
};

export const RemoveFromCart = (product: IProduct): void => {
	store.dispatch(cartRemove(product));
};

export const ClearCart = (): void => {
	store.dispatch(cartClear());
};

export const GetCart = (): { cart: IProduct[] } => {
	return store.getState();
};