import { useSnackbar } from "notistack";

import { IProduct } from "../Types/Abstract";
import { AddToCart, ClearCart } from "../Store/Dispatchers/CartDispatchers";

interface IUseCart {
	addToCart: (product: IProduct) => void
	clearCart: () => void
}

export const useCart = (): IUseCart => {
	const { enqueueSnackbar } = useSnackbar();

	const addToCart = (product: IProduct): void => {
		AddToCart(product);
		enqueueSnackbar(`added ${product.name} to cart`, { variant: "success"});
	};

	const clearCart = (): void => {
		ClearCart();
		enqueueSnackbar("cart cleared", { variant: "warning"});
	};

	return {
		addToCart,
		clearCart
	};
};
