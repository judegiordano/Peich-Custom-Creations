import React from "react";
import { Redirect } from "react-router-dom";
import CheckIcon from "@material-ui/icons/CheckCircleOutline";
import { Card, CardContent, Typography } from "@material-ui/core";

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
				<Card style={styles.card}>
					<CardContent style={{fontSize: "20px"}}>
						<Typography>
							Thanks for your email { location.state.name }!
						</Typography>
						<Typography>
							We will reach out to you shortly!
						</Typography>
						<CheckIcon style={styles.icon} />
					</CardContent>
				</Card>
			</div>
		)
	);
};

const styles = {
	root: {
		textAlign: "center",
		margin: "auto",
		padding: "10px"
	},
	icon: {
		color: "lightgreen",
		height: "70px",
		width: "70px",
		paddingTop: "20px"
	},
	card: {
		margin: "auto",
		maxWidth: "700px"
	}
} as IStyles;