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

interface IStyles {
	[key: string]: React.CSSProperties
}

interface ICart {
	styleProp?: IStyles
}

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

export const CartPage: React.FC<ICart> = ({ styleProp }: ICart): JSX.Element => {

	const { clearCart } = useCart();
	const [cartState, setCartState] = useState({ cart: [{} as IProduct] });

	const [open, setOpen] = React.useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const handleOk = () => {
		clearCart();
		setCartState(GetCart());
		handleClickOpen();
	};
	const handleCancel = () => {
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
				<AppButton text="clear cart" onClick={() => {
					handleClickOpen();
					// clearCart();
					// setCartState(GetCart());
				}} />
				{
					cartState.cart.map(item => (
						<CartItem key={item.id} quantity={1} product={item} />
					))
				}
				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
					style={{fontWeight: "bold"}}
				>
					<DialogTitle id="alert-dialog-title">{"Are you sure you want to clear your cart?"}</DialogTitle>
					<DialogContent>
						<DialogContentText style={{fontWeight: "bold"}} id="alert-dialog-description">
							Click OK to continue or click CANCEL to keep your cart
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleCancel} color="primary">
							CANCEL
						</Button>
						<Button onClick={handleOk} color="primary" autoFocus>
							OK
						</Button>
					</DialogActions>
				</Dialog>

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