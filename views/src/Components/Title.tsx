import React from "react";

interface IStyles {
	[key: string]: React.CSSProperties
}

interface ITitle {
	text: string,
	styleProp?: IStyles
}

export const Title: React.FC<ITitle> = ({ text, styleProp={}}: ITitle): JSX.Element => {
	return (
		<div style={{...styles.root, ...styleProp}}>
			{ text }
		</div>
	);
};

const styles = {
	root: {
		paddingTop: "10px",
		paddingBottom: "10px",
		fontSize: "20px",
		textAlign: "center",
	},
} as IStyles;