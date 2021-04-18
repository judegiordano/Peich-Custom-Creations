import React from "react";

interface IStyles {
	[key: string]: React.CSSProperties
}

interface ICart {
	styleProp?: IStyles
}

export const CartPage: React.FC<ICart> = ({ styleProp }: ICart): JSX.Element => {
	return (
		<div style={{...styles.root, ...styleProp}}>
			my cart
		</div>
	);
};

const styles = {
	root: {
		textAlign: "center",
		margin: "auto"
	}
} as IStyles;