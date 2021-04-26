import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";

import { IProduct, IStyles, ICartProduct, IGallery } from "../../Types/Abstract";
import { ProductAction } from "./ProductAction";
import { AddToCart } from "./ProductPage/AddToCart";
import { ProductModal } from "./ProductModal";
import { client } from "../../Api/Client";

interface IProductCard {
	styleProp?: IStyles
	product: IProduct
}

export const ProductCard: React.FC<IProductCard> = ({ styleProp, product }: IProductCard): JSX.Element => {

	const [expanded, setExpanded] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [gallery, setGallery] = useState([] as IGallery[]);

	const handleClickOpen = () => setModalOpen(true);
	const handleClose = () => setModalOpen(false);
	const handleExpandClick = () => setExpanded(!expanded);

	const getItem = async () => {
		try {
			const { data } = await client.get(`/products/${product.id}`);
			setGallery(data.product.gallery);
		} catch (error) {
			console.log(error);
		}
	};
	
	useEffect(() => {
		getItem();
	}, []);

	return (
		<div style={{ ...styles.root, ...styleProp }}>
			<Card>
				<ProductAction product={product} onClick={handleClickOpen} />

				<CardActions disableSpacing>
					<AddToCart product={{
						...product,
						quantity: 1
					}as ICartProduct} />
					<IconButton
						style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)", marginLeft: "auto" }}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label="show more"
					>
						<ExpandMoreIcon />
					</IconButton>
				</CardActions>

				<Collapse in={expanded} timeout="auto" unmountOnExit>
					<CardContent>
						<Typography paragraph>
							{ product.description }
						</Typography>
					</CardContent>
				</Collapse>
			</Card>

			<ProductModal open={modalOpen} handleClose={handleClose} onClick={handleClose} product={product} gallery={gallery} />
		</div>
	);
};

const styles = {
	root: {
		margin: "auto",
		textAlign: "center",
		maxWidth: "345px",
		paddingTop: "20px",
		paddingBottom: "20px"
	},
	icon: {
		transform: "rotate(180deg)",
	},
} as IStyles;