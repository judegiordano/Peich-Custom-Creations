import { IProduct } from "../../Types/Abstract";
import * as types from "../ActionTypes/Cart";
import { IAction } from "../Reducers/CartReducer";

export const cartAdd = (product: IProduct): IAction => ({
	type: types.ADD,
	payload: {
		product
	}
});

export const cartRemove = (product: IProduct): IAction => ({
	type: types.REMOVE,
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
			description: "",
			photo: "",
			price: 0,
			gallery: [{
				uid: "",
				photo: ""
			}],
			tags: [""],
			added: new Date()
		}
	}
});