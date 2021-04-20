import { useSnackbar } from "notistack";

import { ICartProduct } from "../Types/Abstract";
import { AddToCart, ClearCart, ClearOne } from "../Store/Dispatchers/CartDispatchers";

interface IUseCart {
	addToCart: (product: ICartProduct) => void
	clearCart: () => void,
	clearOne: (product: ICartProduct) => void
}

export const useCart = (): IUseCart => {
	const { enqueueSnackbar } = useSnackbar();

	const addToCart = (product: ICartProduct): void => {
		AddToCart(product);
		enqueueSnackbar(`added ${product.name} to cart`, { variant: "success"});
	};

	const clearCart = (): void => {
		ClearCart();
		enqueueSnackbar("cart cleared", { variant: "warning"});
	};

	const clearOne = (product: ICartProduct): void => {
		ClearOne(product);
		enqueueSnackbar(`${product.name} removed`, { variant: "warning"});
	};

	return {
		addToCart,
		clearCart,
		clearOne
	};
};
