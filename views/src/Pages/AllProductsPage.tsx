import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";

import { client } from "../Api/Client";
import { IStyles, IProduct } from "../Types/Abstract";
import { ProductCard } from "../Components/Product/ProductCard";
import { AppLoader } from "../Components/AppLoader";
import { PaginationBar } from "../Components/Product/PaginationBar";
import { ScrollToTop } from "../Components/Navigation/ScrollToTop";

export const AllProductsPage: React.FC = (): JSX.Element => {

	const pageLimit = 6;
	const [count, setCount] = useState(1);
	const [pageNum, setPageNum] = useState(parseInt(localStorage.getItem("page") as string) || 1);
	const [products, setProducts] = useState([{} as IProduct]);

	const getProducts = async (page: number) => {
		try {
			const { data } = await client.get(`/products/chunk/${page}?limit=${pageLimit}`);
			setProducts(data.products);
		} catch (error) {
			console.log(error);
		}
	};
	const getCount = async () => {
		try {
			const { data } = await client.get("/products/count");
			setCount(data.count);
		} catch (error) {
			console.log(error);
		}
	};
	const changePage = (val: number) => {
		setPageNum(val);
		localStorage.setItem("page", val.toString());
	};

	useEffect(() => {
		getCount();
		getProducts(pageNum);
	}, [pageNum]);

	if (!products[0].name) {
		return (
			<AppLoader visible />
		);
	}

	return (
		<>
			<div style={styles.root}>
				<Grid container spacing={3}>
					{
						products.map(product => (
							<Grid item xs={12} key={product.id} sm={6}>
								<ProductCard product={product} />
							</Grid>
						))
					}
				</Grid>
			</div>
			<PaginationBar
				pageLimit={pageLimit}
				count={count}
				pageNum={pageNum}
				onChange={(e, val: number) => changePage(val)}
			/>
			<ScrollToTop />
		</>
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