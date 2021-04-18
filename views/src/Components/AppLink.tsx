import React from "react";
import Button from "@material-ui/core/Button";

interface IStyles {
	[key: string]: React.CSSProperties
}

interface IAppLink {
	text: string,
	href: string,
	disabled?: boolean
	styleProp?: IStyles
}

export const AppLink: React.FC<IAppLink> = ({ styleProp, disabled = false, href, text }: IAppLink): JSX.Element => {
	return (
		<div style={{...styles.root, ...styleProp}}>
			<Button href={href} color="primary" disabled={disabled}>
				{ text }
			</Button>
		</div>
	);
};

const styles = {
	root: {
		textAlign: "center"
	}
} as IStyles;