import React from "react";
import Typography from "@material-ui/core/Typography";
import "react-gallery-carousel/dist/index.css";
import { Card, CardContent } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";

import { IProduct } from "../../../Types/Abstract";
import { ShareBar } from "./ShareBar";
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
		<Card>
			<CardContent>
				<Typography style={styles.title} variant="h3" gutterBottom>
					{ product.name }
				</Typography>

				<ProductImage product={product} gallery={gallery} />

				<CardActions disableSpacing style={styles.price}>
					<Typography style={{textAlign: "left", fontSize: "x-large"}} variant="body1" gutterBottom>
						${ product.price }
					</Typography>
					<Typography style={{marginLeft: "auto", fontSize: "x-large"}} variant="body1" gutterBottom>
						<AddToCart product={product} />
					</Typography>
				</CardActions>

				<Typography style={styles.description} variant="body1" gutterBottom>
					{ product.description }
				</Typography>

				<ShareBar product={product} />
			</CardContent>
		</Card>
	);
};

const styles = {
	title: {
		paddingBottom: "10px"
	},
	description: {
		textAlign: "justify",
		maxWidth: "700px",
		margin: "auto",
		paddingTop: "20px",
		paddingBottom: "10px",
		fontFamily: "revert"
	},
	price: {
		maxWidth: "700px",
		margin: "auto"
	}
} as IStyles;