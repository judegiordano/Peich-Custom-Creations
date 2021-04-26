import React from "react";
import Typography from "@material-ui/core/Typography";
import "react-gallery-carousel/dist/index.css";
import CardActions from "@material-ui/core/CardActions";

import { IProduct } from "../../../Types/Abstract";
import { ProductImage } from "./ProductImage";
import { AddToCart } from "./AddToCart";

interface IStyles {
	[key: string]: React.CSSProperties
}

interface IGallery {
	uid: string
}

interface IProductCard {
	product: IProduct,
	gallery: IGallery[]
}

export const ProductPageCard: React.FC<IProductCard> = ({ product, gallery }: IProductCard): JSX.Element => {
	return (
		<div style={{height: "100%"}}>
			<ProductImage product={product} gallery={gallery} />

			<CardActions disableSpacing style={styles.price}>
				<Typography style={{textAlign: "left", fontSize: "x-large"}} variant="body1" gutterBottom>
						${ product.price }
				</Typography>
				<Typography style={{marginLeft: "auto", fontSize: "x-large"}} variant="body1" gutterBottom>
					<AddToCart product={{
						id: product.id,
						name: product.name,
						price: product.price,
						quantity: 1
					}} />
				</Typography>
			</CardActions>

			<Typography style={styles.description} variant="body1" gutterBottom>
				{ product.description }
			</Typography>
		</div>
	);
};

const styles = {
	title: {
		paddingBottom: "10px",
		fontWeight: "lighter"
	},
	description: {
		textAlign: "justify",
		maxWidth: "700px",
		margin: "auto",
		padding: "10px",
		paddingTop: "20px",
		fontFamily: "revert"
	},
	price: {
		maxWidth: "700px",
		margin: "auto"
	}
} as IStyles;