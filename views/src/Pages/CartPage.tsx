import React, { useState } from "react";

import { GetCart } from "../Store/Dispatchers/CartDispatchers";
import { CartItem } from "../Components/Cart/CartItem";

interface IStyles {
	[key: string]: React.CSSProperties
}

interface ICart {
	styleProp?: IStyles
}

export const CartPage: React.FC<ICart> = ({ styleProp }: ICart): JSX.Element => {

	const [cartState, setCartState] = useState(GetCart());

	const { cart } = cartState;

	if(cart.length <= 0) {
		return (
			<div style={styles.root}>
				<h2>
					shopping cart empty!
				</h2>
			</div>
		);
	}

	return (
		<div style={{...styles.root, ...styleProp}}>
			{
				cart.map(item => (
					<CartItem key={item.id} quantity={1} product={item}/>
				))
			}
		</div>
	);
};

const styles = {
	root: {
		textAlign: "center",
		margin: "auto",
		paddingTop: "20px"
	}
} as IStyles;