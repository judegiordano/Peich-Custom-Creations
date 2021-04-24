import React, { useEffect, useState } from "react";
import { useParams, Redirect } from "react-router";
import CheckIcon from "@material-ui/icons/CheckCircleOutline";
import { Card, CardContent, Typography } from "@material-ui/core";

import { client } from "../Api/Client";
import { useCart } from "../Hooks/useCart";
import { AppLoader } from "../Components/AppLoader";

interface IStyles {
	[key: string]: React.CSSProperties
}

export const PaymentSuccessPage: React.FC = (): JSX.Element => {
	
	const { token } = useParams() as { token: string };
	const { clearCart } = useCart();
	const [valid, setValid] = useState(false);
	const [loading, setLoading] = useState(true);

	const isValid = async ()  => {
		try {
			setLoading(true);
			const { data } = await client.post("/payment/success/verify", {
				token
			});
			setValid(data.ok);
			setLoading(false);
			clearCart();
		} catch (error) {
			setValid(false);
			setLoading(false);
		}
	};

	useEffect(() => {
		isValid();
	}, []);

	return (
		loading ? (
			<AppLoader visible={true} />
		) : (
			!valid ? (
				<Redirect to="/" />
			) : (
				<div style={{ ...styles.root }}>
					<Card style={styles.card}>
						<CardContent style={{fontSize: "20px"}}>
							<Typography>
								Thank You For Your Purchase!
							</Typography>
							<CheckIcon style={styles.icon} />
						</CardContent>
					</Card>
				</div>
			)
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