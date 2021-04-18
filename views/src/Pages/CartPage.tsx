import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Typography from "@material-ui/core/Typography";

import { GetCart } from "../Store/Dispatchers/CartDispatchers";
import { CartItem } from "../Components/Cart/CartItem";
import { AppButton } from "../Components/AppButton";
import { useCart } from "../Hooks/useCart";
import { IProduct } from "../Types/Abstract";
import { ConfirmClearCart } from "../Components/Cart/ConfirmClearCart";

interface IStyles {
	[key: string]: React.CSSProperties
}

interface ICart {
	styleProp?: IStyles
}

export const CartPage: React.FC<ICart> = ({ styleProp }: ICart): JSX.Element => {

	const { clearCart } = useCart();
	const [cartState, setCartState] = useState({ cart: [{} as IProduct] });
	const [open, setOpen] = useState(false);

	// clear cart confirm functions
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const handleOk = () => {
		clearCart();
		setCartState(GetCart());
		handleClose();
	};

	useEffect(() => {
		setCartState(GetCart());
	}, [cartState]);

	return (
		cartState.cart.length <= 0 ? (
			<div style={styles.root}>
				<Card>
					<CardContent>
						<Typography component="h5" variant="h5">
							shopping cart empty!
						</Typography>
						<Typography>
							<ShoppingCartIcon />
						</Typography>
					</CardContent>
				</Card>
			</div>
		) : (
			<div style={{ ...styles.root, ...styleProp }}>
				<AppButton text="clear cart" onClick={() => handleOpen()} />
				{
					cartState.cart.map(item => (
						<CartItem key={item.id} quantity={1} product={item} />
					))
				}
				<ConfirmClearCart
					handleCancel={handleClose}
					handleOk={handleOk}
					handleClose={handleClose}
					open={open}
				/>
			</div>
		)
	);
};

const styles = {
	root: {
		textAlign: "center",
		margin: "auto",
		paddingTop: "20px",
		fontWeight: "normal"
	}
} as IStyles;