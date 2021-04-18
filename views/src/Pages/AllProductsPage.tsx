import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";

import { client } from "../Api/Client";
import { IStyles, IProduct } from "../Types/Abstract";
import { ProductCard } from "../Components/Product/ProductCard";
import { AppLoader } from "../Components/AppLoader";

export const AllProductsPage: React.FC = (): JSX.Element => {

	const [products, setProducts] = useState([{} as IProduct]);

	const getProducts = async () => {
		try {
			const {data} = await client.get("/products");
			setProducts(data.products);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getProducts();
	}, []);

	return (
		<div style={styles.root}>
			{
				!products[0].name ? (
					<AppLoader visible />
				) : (
					<Grid container spacing={3}>
						{
							products.map(product => (
								<Grid item xs={12} key={product.id} sm={6}>
									<ProductCard product={product} />
								</Grid>
							))
						}
					</Grid>
				)
			}
		</div>
	);
};

const styles = {
	root: {
		flexGrow: 1,
		maxWidth: "1000px",
		margin: "auto",
		textAlign: "center",
		paddingLeft: "20px",
		paddingRight: "20px",
	}
} as IStyles;