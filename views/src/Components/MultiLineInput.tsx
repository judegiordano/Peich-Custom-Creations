import React from "react";
import TextField from "@material-ui/core/TextField";

interface IStyles {
	[key: string]: React.CSSProperties
}

interface IMultiLineInput {
	rows?: number
	maxlength?: number,
	label?: string,
	disabled?: boolean,
	error?: boolean,
	errorText?: string,
	placeholder?: string,
	type?: "password" | "number" | "search" | "date" | "email" | "text",
	styleProp?: IStyles,
	autoComplete?: "on" | "off"
	required?: boolean,
	onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> | undefined,
}

export const MultiLineInput: React.FC<IMultiLineInput> = ({
	rows = 4,
	maxlength = 120,
	styleProp,
	type,
	errorText,
	disabled = false,
	error = false,
	label = "label",
	autoComplete = "off",
	placeholder = "placeholder...",
	required,
	onChange
}: IMultiLineInput): JSX.Element => {
	return (
		<div style={{...styles.root, ...styleProp}}>
			<TextField
				style={{fontWeight: "bold"}}
				fullWidth
				id="outlined-basic"
				label={label}
				disabled={disabled}
				variant="outlined"
				type={type}
				error={error}
				helperText={errorText}
				placeholder={placeholder}
				autoComplete={autoComplete}
				onChange={onChange}
				required={required}
				multiline
				rows={rows}
				inputProps={{ maxLength: maxlength }}
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