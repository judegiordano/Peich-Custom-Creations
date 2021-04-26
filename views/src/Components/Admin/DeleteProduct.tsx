import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { AppButton } from "../AppButton";
import { AppLoader } from "../AppLoader";
import { Typography } from "@material-ui/core";
import { useDeleteProduct } from "../../Hooks/admin/useDeleteProduct";

interface IStyles {
	[key: string]: React.CSSProperties
}

interface IProductLean {
	id: number,
	name: string
}

interface IDeleteProduct {
	styleProp?: IStyles
}

export const DeleteProduct: React.FC<IDeleteProduct> = ({ styleProp }: IDeleteProduct): JSX.Element => {

	const { open, setOpen, error, deleteItem, setDeleteItem, products, handleSubmit, getAllProducts} = useDeleteProduct();

	useEffect(() => {
		getAllProducts();
	}, [open == true]);

	if(products.length <= 0) return (
		<AppLoader visible />
	);

	return (
		<div style={{...styles.root, ...styleProp}}>
			<AppButton color="secondary" styleProp={styles.button as IStyles} text="Delete Product" onClick={() => setOpen(true)} />

			<Dialog open={open} onClose={() => setOpen(false)}>
				<form onSubmit={e => handleSubmit(e)}>
					<DialogTitle>Delete Item</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Remove an item from the store listing
						</DialogContentText>
						<Autocomplete
							onChange={(e, value) => setDeleteItem(value as IProductLean)}
							options={products}
							getOptionLabel={option => option.name}
							style={{ width: 300 }}
							renderInput={(params) => <TextField {...params} label="Product Name" variant="outlined" />}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={() => setOpen(false)} color="primary">
							Cancel
						</Button>
						<Button type="submit" color="primary" disabled={!deleteItem}>
							Confirm
						</Button>
					</DialogActions>
					<Typography style={{color: "salmon", textAlign: "center", paddingBottom: "5px"}}>{ error || "" }</Typography>
				</form>
			</Dialog>
		</div>
	);
};

const styles = {
	root: {
		textAlign: "center",
		margin: "auto",
		padding: "10px",
	},
	button: {
		maxWidth: "200px"
	}
} as IStyles;