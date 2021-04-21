import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import IconButton from "@material-ui/core/IconButton";

import { IStyles } from "../../Types/Abstract";

interface IDeleteFromCart {
	handleClear: React.MouseEventHandler<HTMLAnchorElement>
}

export const DeleteFromCart: React.FC<IDeleteFromCart> = ({ handleClear }: IDeleteFromCart): JSX.Element => {
	return (
		<Tooltip TransitionComponent={Zoom} title={"remove all from cart"}>
			<IconButton
				href=""
				style={{padding: 0, display: "inline", float: "right", paddingTop: "5px"}}
				onClick={handleClear as React.MouseEventHandler<HTMLAnchorElement>}
			>
				<DeleteIcon style={styles.deleteIcon} />
			</IconButton>
		</Tooltip>
	);
};

const styles = {
	root: {
		textAlign: "center"
	},
	deleteIcon: {
		color: "salmon",
		height: "20px",
		width: "20px"
	}
} as IStyles;