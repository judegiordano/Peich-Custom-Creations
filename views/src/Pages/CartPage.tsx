import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Typography from "@material-ui/core/Typography";

import { GetCart } from "../Store/Dispatchers/CartDispatchers";
import { CartItem } from "../Components/Cart/CartItem";
import { AppButton } from "../Components/AppButton";
import { useCart } from "../Hooks/useCart";
import { ICartProduct } from "../Types/Abstract";
import { ConfirmClearCart } from "../Components/Cart/ConfirmClearCart";
import { PayPalButton } from "../Components/Cart/PayPalButton";

interface IStyles {
	[key: string]: React.CSSProperties
}

interface ICart {
	styleProp?: IStyles
}

interface IPayPalInvoice {
	itemId: number,
	quantity: number
}

export const CartPage: React.FC<ICart> = ({ styleProp }: ICart): JSX.Element => {

	const { clearCart, clearOne } = useCart();
	const [cartTotal, setCartTotal] = useState(0);
	const [cartState, setCartState] = useState({ cart: [{} as ICartProduct] });
	const [invoiceCart, setInvoiceCart] = useState([{} as IPayPalInvoice]);
	const [open, setOpen] = useState(false);

	// clear cart confirm functions
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const handleOk = () => {
		clearCart();
		setCartState(GetCart());
		handleClose();
	};
	const handlClearOne = (product: ICartProduct) => {
		clearOne(product);
		setCartState(GetCart());
	};
	const getCartTotal = () => {
		let total = 0;
		cartState.cart.forEach(item => {
			total += (item.price * item.quantity);
		});
		return total;
	};
	const setPayPalCart = () => {
		const payPalCart: IPayPalInvoice[] = [];

		cartState.cart.forEach(item => {
			payPalCart.push({
				itemId: item.id,
				quantity: item.quantity
			});
		});
		setInvoiceCart(payPalCart);
	};

	useEffect(() => {
		setCartState(GetCart());
		setCartTotal(getCartTotal());
		setPayPalCart();
	}, [cartState]);

	return (
		cartState.cart.length <= 0 ? (
			<div style={styles.root}>
				<Card>
					<CardContent>
						<Typography component="h5" variant="h5">
							shopping cart empty!
						</Typography>
						<Typography style={{paddingTop: "10px"}}>
							<ShoppingCartIcon style={{height: "30px", width: "30px"}} />
						</Typography>
					</CardContent>
				</Card>
			</div>
		) : (
			<>
				<div style={{ ...styles.root, ...styleProp }}>
					<Card>
						<CardContent>
							{/* clear cart */}
							<AppButton styleProp={{ ...styles.clearButton as IStyles }} text="clear cart" onClick={() => handleOpen()} />
							{
								cartState.cart.map(item => (
									<CartItem key={item.id} product={item} handleClear={() => handlClearOne(item)} />
								))
							}
							<Card style={{ maxWidth: "500px", margin: "auto", marginTop: "10px" }}>
								<CardContent>
									<Typography style={{ textAlign: "left", color: "gray", float: "right", paddingBottom: "15px"}}>
										Total:
										<Typography style={{ textAlign: "right", color: "gray", display: "inline", paddingLeft: "5px" }}>
											${Math.round(cartTotal * 100) / 100}
										</Typography>
									</Typography>
								</CardContent>
							</Card>
						</CardContent>
						{/* checkout button */}
					</Card>
					<ConfirmClearCart
						handleCancel={handleClose}
						handleOk={handleOk}
						handleClose={handleClose}
						open={open}
					/>
				</div>
				<PayPalButton invoiceCart={invoiceCart} />
			</>
		)
	);
};

const styles = {
	root: {
		textAlign: "center",
		margin: "auto",
		paddingTop: "20px",
		fontWeight: "normal",
		maxWidth: "800px"
	},
	clearButton: {
		maxWidth: "150px",
		width: "auto",
		padding: "10px"
	}
} as IStyles;