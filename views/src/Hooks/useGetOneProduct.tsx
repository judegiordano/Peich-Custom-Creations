import { useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";

import { client } from "../Api/Client";
import { IProduct as IItem } from "../Types/Abstract";

interface IGallery {
	uid: string
}

interface IUseGetProducts {
	product: IItem,
	gallery: IGallery[],
	getItem: () => Promise<void>
}

export const useGetOneProduct = (): IUseGetProducts => {

	const history = useHistory();
	const { id } = useParams() as { id: string };
	const [product, setProduct] = useState({} as IItem);
	const [gallery, setGallery] = useState([{} as { uid: string }]);

	const getItem = async () => {
		try {
			const { data } = await client.get(`/products/${id}`);
			if (!data.product) {
				return history.push("/");
			}
			setGallery(data.product.gallery);
			setProduct(data.product);
		} catch (error) {
			console.log(error);
		}
	};

	return {
		product,
		gallery,
		getItem
	};
};
