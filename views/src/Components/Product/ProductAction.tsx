import React from "react";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import { useHistory } from "react-router-dom";

import { IProduct, IStyles } from "../../Types/Abstract";

interface IProductAction {
	product: IProduct
}

const SubDateHeader = ({content}: { content: Date}) => {
	return (
		<p style={{fontFamily: "system-ui", padding: "none", margin: 0, fontSize: "12px"}}>
			{
				new Date(content).toLocaleDateString("en-gb",
					{
						year: "numeric",
						month: "long",
						day: "numeric",
						timeZone: "utc"
					}
				)
			}
		</p>
	);
};

export const ProductAction: React.FC<IProductAction> = ({ product }: IProductAction): JSX.Element => {

	const history = useHistory();

	return (
		<CardActionArea style={styles.root} onClick={() => history.push(`/item/${product.id}`)}>
			<CardHeader
				style={styles.bolder}
				title={product.name}
				subheader={<SubDateHeader content={product.added} />}
			/>

			<CardMedia
				style={{
					height: 0,
					paddingTop: "56.25%"
				}}
				image={`/api/products/image/${product.id}`}
				title={product.name}
			/>
			
			<CardContent style={{paddingBottom: "0px"}}>
				<Typography style={styles.bolder} variant="body2" color="textSecondary" component="p">
					{
						product.tags.length > 0 && (
							<>
								Tags:&nbsp;{product.tags.slice(0, 3).join(", ").toLowerCase().trim()}
							</>
						)
					}
				</Typography>
				<Typography style={{ fontSize: "20px", fontWeight: "bold"}} variant="body2" color="textPrimary" component="p">
					${`${product.price}`}
				</Typography>
			</CardContent>
		</CardActionArea>
	);
};

const styles = {
	root: {
	},
	bolder: {
		fontWeight: "bold"
	}
} as IStyles;