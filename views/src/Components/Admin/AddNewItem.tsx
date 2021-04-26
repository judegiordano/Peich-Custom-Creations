import React from "react";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";

import { AppButton } from "../AppButton";
import { Divider, Typography } from "@material-ui/core";
import { useAddProduct } from "../../Hooks/admin/useAddProduct";

interface IStyles {
	[key: string]: React.CSSProperties
}

interface IAddNewItem {
	styleProp?: IStyles
}

type event = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>

export const AddNewItem: React.FC<IAddNewItem> = ({ styleProp }: IAddNewItem): JSX.Element => {

	const  { newItemOpen,
		formData,
		setFormData,
		submitAddProduct,
		handleClose,
		handleOpen} = useAddProduct();

	const buttonTypes = [
		{
			label: "Product Name", type: "text",
			prop: (e: event) => setFormData({ ...formData, name: e.target.value })
		},
		{
			label: "Description", type: "currency",
			prop: (e: event) => setFormData({ ...formData, description: e.target.value })
		},
		{
			label: "Price", type: "number",
			prop: (e: event) => setFormData({ ...formData, price: parseInt(e.target.value) })
		}
	];

	return (
		<div style={{ ...styles.root, ...styleProp }}>
			<AppButton styleProp={styles.button as IStyles} text="Add Product" onClick={handleOpen} />

			<Dialog open={newItemOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
				<form onSubmit={e => submitAddProduct(e)}>
					<DialogTitle>Add New Item</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Insert new item with a name, description, price, and photo
						</DialogContentText>
						{
							buttonTypes.map(button => (
								<TextField
									key={button.label}
									autoComplete="off"
									required
									margin="dense"
									label={button.label}
									type={button.type}
									fullWidth
									onChange={e => button.prop(e)}
								/>
							))
						}
						<Typography>Upload Picture</Typography>
						<input
							style={styles.file}
							accept="image/*"
							required
							type="file"
							onChange={e => setFormData({ ...formData, picture: e.target.files as FileList })}
						/>
						<Divider />
						<Typography>Upload Gallery Images</Typography>
						<input
							style={styles.file}
							accept="image/*"
							multiple
							type="file"
							onChange={e => setFormData({ ...formData, gallery: e.target.files as FileList })}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
							Cancel
						</Button>
						<Button type="submit" color="primary">
							Confirm
						</Button>
					</DialogActions>
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
	},
	file: {
		paddingTop: "5px",
		paddingBottom: "5px",
		width: "100%"
	}
} as IStyles;