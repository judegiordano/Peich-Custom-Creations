import { useState } from "react";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../Store/Store";
import { cartAdd, cartClear as _clearCart, cartClearOne } from "../Store/Actions/Cart";
import { ICartProduct } from "../Types/Abstract";
import { client } from "../Api/Client";

interface IPayPalInvoice {
	itemId: number,
	quantity: number
}

interface IUseCart {
	addToCart: (product: ICartProduct) => void
	clearCart: () => void,
	clearOne: (product: ICartProduct) => void,
	loading: boolean,
	checkout: (e: React.FormEvent<HTMLFormElement>, invoiceCart: IPayPalInvoice[]) => Promise<void>,
}

export const useCart = (): IUseCart => {
	
	const dispatch = useDispatch<AppDispatch>();
	const { enqueueSnackbar } = useSnackbar();
	const [loading, setLoading] = useState(false);

	const addToCart = (product: ICartProduct): void => {
		dispatch(cartAdd(product));
		enqueueSnackbar(`added ${product.name} to cart`, { variant: "success"});
	};

	const clearCart = (): void => {
		dispatch(_clearCart());
		enqueueSnackbar("cart cleared", { variant: "warning"});
	};

	const clearOne = (product: ICartProduct): void => {
		dispatch(cartClearOne(product));
		enqueueSnackbar(`${product.name} removed`, { variant: "warning"});
	};

	const checkout = async (e: React.FormEvent<HTMLFormElement>, invoiceCart: IPayPalInvoice[]) => {
		try {
			setLoading(true);
			e.preventDefault();
			const { data } = await client.post("payment/pay", { cart: [ ...invoiceCart ]});
			setLoading(false);
			window.location = data;
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};

	return {
		addToCart,
		clearCart,
		clearOne,
		loading,
		checkout
	};
};
