import React from "react";
import Button from "@material-ui/core/Button";

interface IStyles {
	[key: string]: React.CSSProperties
}

interface IAppButton {
	onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined,
	text?: string,
	disabled?: boolean,
	startIcon?: React.ReactNode,
	endIcon?: React.ReactNode,
	styleProp?: IStyles,
	color?: "inherit" | "primary" | "secondary" | "default",
	type? : "button" | "submit" | "reset"
}

export const AppButton: React.FC<IAppButton> = ({
	onClick,
	text = "Click Me",
	disabled = false,
	startIcon,
	endIcon,
	type,
	color = "primary",
	styleProp
}: IAppButton): JSX.Element => {
	return (
		<div style={{...styles.root, ...styleProp}}>
			<Button
				style={styles.button}
				fullWidth
				variant="outlined"
				color={color}
				disabled={disabled}
				onClick={onClick}
				startIcon={startIcon}
				endIcon={endIcon}
				type={type}
			>
				{ text }
			</Button>
		</div>
	);
};

const styles = {
	root: {
		margin: "auto",
		width: "100%",
		textAlign: "center",
		paddingTop: "5px",
		paddingBottom: "5px"
	},
	button: {
		paddingTop: "10px",
		paddingBottom: "10px"
	}
} as IStyles;