import React from "react";
import { Redirect } from "react-router";

interface IStyles {
	[key: string]: React.CSSProperties
}

interface IError {
	location: {
		state: {
			errorMsg: string
		}
	}
}

export const Error: React.FC<IError> = ({ location }: IError): JSX.Element => {
	return (
		!location.state ? (
			<Redirect to="/" />
		) : (
			<div style={{ ...styles.root }}>
				Error:
				<p style={styles.error}>
					{location.state.errorMsg}
				</p>
			</div>
		)
	);
};

const styles = {
	root: {
		textAlign: "center",
	},
	error: {
		color: "salmon"
	}
} as IStyles;