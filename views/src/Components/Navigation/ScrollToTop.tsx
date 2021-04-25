import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { IStyles } from "../../Types/Abstract";

export const ScrollToTop: React.FC = (): JSX.Element => {
	return (
		<div style={styles.root}>
			<IconButton onClick={() => window["scrollTo"]({top: 0, behavior: "smooth"})} style={{padding: "0"}}>
				<ArrowUpwardIcon />
			</IconButton>
		</div>
	);
};

const styles = {
	root: {
		position: "fixed",
		bottom: "20px",
		right: "20px",
		height: "40px",
		width: "40px",
		borderRadius: "20px",
		background: "gray",
		opacity: ".5",
		display: "inline-grid",
		fontSize: "20px"
	}
} as IStyles;