import React, { useState } from "react";
import { useSnackbar } from "notistack";

import { client } from "../../Api/Client";

type submit = React.FormEvent<HTMLFormElement>

interface IFormData {
	name: string;
	description: string;
	price: number;
	picture: FileList;
	gallery: FileList;
}

interface IUseAddProduct {
	newItemOpen: boolean,
	setFormData: React.Dispatch<React.SetStateAction<IFormData>>,
	formData: IFormData,
	submitAddProduct: (e: submit) => Promise<void>,
	handleClose: () => void
	handleOpen: () => void
}

export const useAddProduct = (): IUseAddProduct => {

	const [newItemOpen, setNewItemOpen] = useState(false);
	const { enqueueSnackbar } = useSnackbar();
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		price: 0,
		picture: [] as unknown as FileList,
		gallery: [] as unknown as FileList
	});

	const handleClose = () => setNewItemOpen(false);
	const handleOpen = () => setNewItemOpen(true);

	const submitAddProduct = async (e: submit) => {
		try {
			e.preventDefault();
			const fileData = new FormData();

			fileData.append("name", formData.name);
			fileData.append("description", formData.description);
			fileData.append("price", formData.price.toString());
			fileData.append("picture", formData.picture[0]);

			for (let i = 0; i < formData.gallery.length; i++) {
				fileData.append(`gallery_${i}`, formData.gallery[i]);
			}

			const { data } = await client.post("admin/addproduct", fileData, {headers: { "Content-Type": "multipart/form-data" }});
			if(!data.ok) throw new Error();
			
			enqueueSnackbar("new item added successfully", { variant: "success"});
			handleClose();
		} catch (error) {
			enqueueSnackbar("error adding item", { variant: "warning"});
			console.log(error);
		}
	};
	
	return {
		newItemOpen,
		setFormData,
		submitAddProduct,
		handleClose,
		handleOpen,
		formData
	};
};
