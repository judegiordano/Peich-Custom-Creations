import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";

import { IProduct, IStyles } from "../../Types/Abstract";
import { ProductAction } from "./ProductAction";
import { AddToCart } from "./ProductPage/AddToCart";

interface IProductCard {
	styleProp?: IStyles
	product: IProduct
}

export const ProductCard: React.FC<IProductCard> = ({ styleProp, product }: IProductCard): JSX.Element => {
	
	const [expanded, setExpanded] = useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<div style={{ ...styles.root, ...styleProp }}>
			<Card>
				<ProductAction product={product} />

				<CardActions disableSpacing>
					<AddToCart product={product} />
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
						<Typography style={{fontWeight: "bold"}} paragraph>
							{ product.description }
						</Typography>
					</CardContent>
				</Collapse>
			</Card>
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