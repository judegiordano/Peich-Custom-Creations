import React, { useEffect } from "react";

import { IStyles } from "../Types/Abstract";
import { AppLoader } from "../Components/AppLoader";
import { ProductPageCard } from "../Components/Product/ProductPage/ProductPageCard";
import { useGetOneProduct } from "../Hooks/useGetOneProduct";

interface IProduct {
	styleProp?: IStyles
}

export const ProductPage: React.FC<IProduct> = ({ styleProp }: IProduct): JSX.Element => {

	const { gallery, product, getItem } = useGetOneProduct();

	useEffect(() => {
		getItem();
	}, []);
	
	return (
		<div style={{ ...styles.root, ...styleProp }}>
			{
				!product.name ? <AppLoader visible /> : <ProductPageCard product={product} gallery={gallery}/>
			}
		</div>
	);
};

const styles = {
	root: {
		margin: "auto",
		textAlign: "center",
		padding: "20px"
	}
} as IStyles;