import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
// import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import { IProduct, IStyles } from "../../Types/Abstract";

interface ICartItem {
	product: IProduct,
	quantity: number
}

export const CartItem: React.FC<ICartItem> = ({ product, quantity }: ICartItem): JSX.Element => {

	const [itemCount, setItemCount] = useState(quantity);

	return (
		<div style={{ ...styles.root }}>
			<Card style={styles.cardRoot}>
				<CardMedia
					style={styles.cover}
					image={`/api/products/image/${product.id}`}
					title={product.name}
				/>
				<div style={styles.details}>
					<CardContent style={styles.content}>
						<Typography component="h5" variant="h5">
							{ product.name }
						</Typography>
						<Typography style={{fontWeight: "bold", textAlign: "left"}} variant="subtitle1" color="textSecondary">
							quantity: X{ itemCount }
						</Typography>
					</CardContent>
					{/* <div className={classes.controls}>
						<IconButton aria-label="previous">
							{theme.direction === "rtl" ? <SkipNextIcon /> : <SkipPreviousIcon />}
						</IconButton>
						<IconButton aria-label="play/pause">
							<PlayArrowIcon className={classes.playIcon} />
						</IconButton>
						<IconButton aria-label="next">
							{theme.direction === "rtl" ? <SkipPreviousIcon /> : <SkipNextIcon />}
						</IconButton>
					</div> */}
				</div>
			</Card>
		</div>
	);
};

const styles = {
	root: {
		textAlign: "center",
		maxWidth: "500px",
		margin: "auto",
		padding: "10px"
	},
	cardRoot: {
		display: "flex"
	},
	details: {
		display: "flex",
		flexDirection: "column",
	},
	content: {
		flex: "1 0 auto",
		paddingBottom: "0",
		paddingTop: "0",
	},
	cover: {
		width: 151,
	},
} as IStyles;