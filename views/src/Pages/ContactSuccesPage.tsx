import React from "react";
import { Redirect } from "react-router-dom";

interface IStyles {
	[key: string]: React.CSSProperties
}

interface IContactSuccesPage {
	styleProp?: IStyles,
	location: {
		state: {
			name: string
		}
	}
}

export const ContactSuccesPage: React.FC<IContactSuccesPage> = ({ location }: IContactSuccesPage): JSX.Element => {
	return (
		!location.state ? (
			<Redirect to="/" />
		) : (
			<div style={{ ...styles.root }}>
				thanks for your email { location.state.name }!
			</div>
		)
	);
};

const styles = {
	root: {
		textAlign: "center",
		margin: "auto"
	}
} as IStyles;