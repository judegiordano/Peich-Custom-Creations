import { ICartProduct } from "../../Types/Abstract";
import * as types from "../ActionTypes/Cart";
import { IAction } from "../Reducers/CartReducer";

export const cartAdd = (product: ICartProduct): IAction => ({
	type: types.ADD,
	payload: {
		product
	}
});

export const cartRemove = (product: ICartProduct): IAction => ({
	type: types.REMOVE,
	payload: {
		product
	}
});

export const cartClearOne = (product: ICartProduct): IAction => ({
	type: types.CLEARONE,
	payload: {
		product
	}
});

export const cartClear = (): IAction => ({
	type: types.CLEAR,
	payload: {
		product: {
			id: 0,
			name: "",
			price: 0,
			quantity: 1
		}
	}
});