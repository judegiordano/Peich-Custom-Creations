import React from "react";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import { ProductPageCard } from "./ProductPage/ProductPageCard";

import { ShareBar } from "./ProductPage/ShareBar";
import { IGallery, IProduct, IStyles } from "../../Types/Abstract";

interface IProductModal {
	handleClose: ((event: Record<string, unknown>, reason: "backdropClick" | "escapeKeyDown") => void) | undefined,
	onClick: React.MouseEventHandler<HTMLButtonElement>,
	open: boolean,
	product: IProduct,
	gallery: IGallery[]
}

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & { children?: React.ReactElement },
	ref: React.Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export const ProductModal: React.FC<IProductModal> = ({ handleClose, open, onClick, product, gallery }: IProductModal): JSX.Element => {
	return (
		<div style={styles.root}>
			<Dialog fullScreen open={open} onClose={handleClose} style={{maxWidth: "700px", margin: "auto"}} TransitionComponent={Transition}>
				<AppBar style={{ position: "relative" }}>
					<Toolbar>
						<IconButton edge="start" color="inherit" onClick={onClick} aria-label="close">
							<CloseIcon />
						</IconButton>
						<Typography variant="h6" style={{ flex: 1 }}>
							{ product.name }
						</Typography>
						<ShareBar product={product} />
					</Toolbar>
				</AppBar>
				<ProductPageCard product={product} gallery={gallery} />
			</Dialog>
		</div>
	);
};

const styles = {
	root: {
		margin: "auto",
		textAlign: "center",
		padding: "20px",
		maxWidth: "700px"
	}
} as IStyles;