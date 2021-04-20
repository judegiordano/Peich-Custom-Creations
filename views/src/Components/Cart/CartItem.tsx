import React from "react";
import { useHistory } from "react-router";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";

import { IStyles, ICartProduct } from "../../Types/Abstract";
import { CardActionArea } from "@material-ui/core";

interface ICartItem {
	product: ICartProduct,
	handleClear: React.MouseEventHandler<HTMLButtonElement> | undefined
}

export const CartItem: React.FC<ICartItem> = ({ product, handleClear }: ICartItem): JSX.Element => {

	const history = useHistory();

	return (
		<div style={{ ...styles.root }}>
			<Card style={styles.cardRoot}>
				<CardActionArea style={styles.cardActionArea} onClick={() => history.push(`/item/${product.id}`)}>
					<CardMedia
						style={styles.cover}
						image={`/api/products/image/${product.id}`}
						title={product.name}
					/>
				</CardActionArea>
				<div style={styles.details}>
					<CardContent style={styles.content}>
						<Typography style={{display: "inline", float: "left", fontSize: "15px"}} component="h6" variant="h6">
							{ product.name }
							<Typography style={{display: "inline", fontSize:"10px", paddingLeft: "5px", opacity: ".5"}}>
								${ product.price }
							</Typography>
						</Typography>
						<IconButton
							style={{padding: 0, display: "inline", float: "right", paddingTop: "5px"}}
							aria-label="previous"
							onClick={handleClear}
						>
							<DeleteIcon style={styles.deleteIcon} />
						</IconButton>
						<Typography style={{textAlign: "left", fontSize:"15px", width: "100%", float: "left"}} variant="subtitle1" color="textSecondary">
							quantity: x{ product.quantity }
							<Typography style={{display: "inline", float: "right"}}>
								${ Math.round((product.quantity * product.price) * 100) / 100 }
							</Typography>
						</Typography>
					</CardContent>
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
		width: "100%"
	},
	content: {
		flex: "1 0 auto",
		paddingBottom: "0",
		paddingTop: "0",
	},
	cardActionArea: {
		maxWidth: "100px"
	},
	cover: {
		width: "100%",
		maxHeight: "",
		paddingTop: "56.25%"
	},
	deleteIcon: {
		color: "salmon",
		height: "20px",
		width: "20px"
	}
} as IStyles;