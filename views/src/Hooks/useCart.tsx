import { useState } from "react";
import { useSnackbar } from "notistack";

import { ICartProduct } from "../Types/Abstract";
import { AddToCart, ClearCart, ClearOne, GetCart } from "../Store/Dispatchers/CartDispatchers";
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
	count: number
}

export const useCart = (): IUseCart => {
	
	const { enqueueSnackbar } = useSnackbar();
	const [loading, setLoading] = useState(false);
	const [count, setCount] = useState(GetCart().cart.length);

	const addToCart = (product: ICartProduct): void => {
		AddToCart(product);
		setCount(count + 1);
		enqueueSnackbar(`added ${product.name} to cart`, { variant: "success"});
	};

	const clearCart = (): void => {
		ClearCart();
		// setCart(GetCart());
		enqueueSnackbar("cart cleared", { variant: "warning"});
	};

	const clearOne = (product: ICartProduct): void => {
		ClearOne(product);
		// setCart(GetCart());
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
		checkout,
		count
	};
};
