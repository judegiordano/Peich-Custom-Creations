import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import ClearIcon from "@material-ui/icons/Clear";
import CheckIcon from "@material-ui/icons/Check";

interface IConfirmClearCart {
	open: boolean,
	handleClose: React.MouseEventHandler<HTMLButtonElement> | undefined,
	handleCancel: React.MouseEventHandler<HTMLButtonElement> | undefined,
	handleOk: React.MouseEventHandler<HTMLButtonElement> | undefined
}

export const ConfirmClearCart: React.FC<IConfirmClearCart> = ({ 
	open,
	handleClose,
	handleCancel,
	handleOk
}: IConfirmClearCart): JSX.Element => {
	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			style={{fontWeight: "bold"}}
		>
			<DialogTitle id="alert-dialog-title">{"Are you sure you want to clear your cart?"}</DialogTitle>
			<DialogContent>
				<DialogContentText style={{fontWeight: "bold"}} id="alert-dialog-description">
							Click OK to continue or click CANCEL to keep your cart
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleCancel} endIcon={<ClearIcon />} style={{color: "salmon"}}>CANCEL</Button>
				<Button onClick={handleOk} endIcon={<CheckIcon />} color="primary" autoFocus>OK</Button>
			</DialogActions>
		</Dialog>
	);
};