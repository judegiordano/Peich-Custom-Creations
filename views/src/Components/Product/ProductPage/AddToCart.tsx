import React from "react";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";

import { IProduct, IStyles } from "../../../Types/Abstract";
import { useCart } from "../../../Hooks/useCart";

interface IAddToCart {
	product: IProduct
}

export const AddToCart: React.FC<IAddToCart> = ({ product }: IAddToCart): JSX.Element => {

	const { addToCart } = useCart();

	return (
		<div style={styles.root}>
			<Tooltip TransitionComponent={Zoom} title={`add ${product.name} to cart`}>
				<IconButton onClick={() =>{
					addToCart(product);
				}}>
					<AddShoppingCartIcon />
				</IconButton>
			</Tooltip>
		</div>
	);
};

const styles = {
	root: {
		padding: "none"
	}
} as IStyles;