import React from "react";
import TextField from "@material-ui/core/TextField";

interface IStyles {
	[key: string]: React.CSSProperties
}

interface IInput {
	label?: string,
	disabled?: boolean,
	error?: boolean,
	errorText?: string,
	placeholder?: string,
	type?: "password" | "number" | "search" | "date" | "email",
	styleProp?: IStyles,
	onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> | undefined
}

export const AppInput: React.FC<IInput> = ({ 
	styleProp,
	type,
	errorText,
	disabled = false,
	error = false,
	label = "label",
	placeholder = "placeholder...",
	onChange
}: IInput): JSX.Element => {
	return (
		<div style={{...styles.root, ...styleProp}}>
			<TextField
				fullWidth
				id="outlined-basic"
				label={label}
				disabled={disabled}
				variant="outlined"
				type={type}
				error={error}
				helperText={errorText}
				placeholder={placeholder}
				onChange={onChange}
			/>
		</div>
	);
};

const styles = {
	root: {
		margin: "auto",
		width: "400px",
		textAlign: "center",
		paddingTop: "15px",
		paddingBottom: "15px"
	}
} as IStyles;