import React, { useState } from "react";
import { useSnackbar } from "notistack";

import { client } from "../../Api/Client";

type submit = React.FormEvent<HTMLFormElement>

interface IProductLean {
	id: number,
	name: string
}

interface IUseDeleteProduct {
	open: boolean,
	setOpen: React.Dispatch<React.SetStateAction<boolean>>,
	error: string,
	deleteItem: IProductLean,
	setDeleteItem: React.Dispatch<React.SetStateAction<IProductLean>>,
	products: IProductLean[],
	handleSubmit: (e: submit) => Promise<void>,
	getAllProducts: () => Promise<void>
}

export const useDeleteProduct = (): IUseDeleteProduct => {

	const [open, setOpen] = useState(false);
	const { enqueueSnackbar } = useSnackbar();
	const [error, setError] = useState(String);
	const [deleteItem, setDeleteItem] = useState({} as IProductLean);
	const [products, setProducts] = useState([] as IProductLean[]);

	const getAllProducts = async () => {
		try {
			const { data } = await client.get("admin/productnames");
			console.log(data);
			setProducts(data.products);
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmit = async (e: submit) => {
		try {
			e.preventDefault();
			if(!deleteItem.id) throw new Error("please select an item");
			await client.delete(`admin/product/${deleteItem.id}`);

			setOpen(false);
			setError("");
			enqueueSnackbar("item deleted", { variant: "warning"});
		} catch (error) {
			setError(error.message);
			console.log(error);
		}
	};

	return {
		open,
		setOpen,
		error,
		deleteItem,
		setDeleteItem,
		products,
		handleSubmit,
		getAllProducts
	};
};
