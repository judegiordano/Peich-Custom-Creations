import React from "react";

import { AppButton } from "../AppButton";
import { useCart } from "../../Hooks/useCart";
import { AppLoader } from "../AppLoader";

interface IStyles {
	[key: string]: React.CSSProperties
}

interface IPayPalInvoice {
	itemId: number,
	quantity: number
}

interface IPayPalButton {
	styleProp?: IStyles,
	invoiceCart: IPayPalInvoice[]
}

export const PayPalButton: React.FC<IPayPalButton> = ({ styleProp, invoiceCart }: IPayPalButton): JSX.Element => {
	const { loading, checkout } = useCart();
	return (
		<div style={{...styles.root, ...styleProp}}>
			<form onSubmit={(e) => checkout(e, invoiceCart)}>
				<AppButton
					disabled={loading}
					type="submit"
					text="Checkout"
					startIcon={
						<img src="https://logos-world.net/wp-content/uploads/2020/05/PayPal-Logo.png"
							width={75}
							height={50}
						/>
					} />
			</form>
			<AppLoader visible={loading} />
		</div>
	);
};

const styles = {
	root: {
		textAlign: "center",
		margin: "auto",
		maxWidth: "500px",
		padding: "20px",
	}
} as IStyles;