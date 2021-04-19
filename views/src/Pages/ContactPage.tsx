import React from "react";
import { Card, CardContent } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

import { AppButton } from "../Components/AppButton";
import { AppInput } from "../Components/AppInput";
import { MultiLineInput } from "../Components/MultiLineInput";

interface IStyles {
	[key: string]: React.CSSProperties
}

interface IContactPage {
	styleProp?: IStyles
}

export const ContactPage: React.FC<IContactPage> = ({ styleProp }: IContactPage): JSX.Element => {
	return (
		<div style={{...styles.root, ...styleProp}}>
			<Card>
				<CardContent>
					<AppInput
						placeholder="your email..."
						label="Email"
						type="email"
						required
					/>
					<AppInput
						placeholder="your name..."
						label="Name"
						type="text"
						required
					/>
					<MultiLineInput
						placeholder="your message..."
						label="Message"
						maxlength={500}
						required
					/>
					<AppButton
						text="send"
						styleProp={styles.button as IStyles}
						onClick={() => alert("this is a work in progress")}
						endIcon={<SendIcon />}
					/>
				</CardContent>
			</Card>
		</div>
	);
};

const styles = {
	root: {
		margin: "auto",
		maxWidth: "700px",
		padding: "10px"
	},
	input: {
		fontWeight: "bold"
	},
	button: {
		width: "400px"
	}
} as IStyles;