import React, { useState } from "react";
import { Card, CardContent } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

import { AppButton } from "../Components/AppButton";
import { AppInput } from "../Components/AppInput";
import { MultiLineInput } from "../Components/MultiLineInput";
import { client } from "../Api/Client";
import { AppLoader } from "../Components/AppLoader";

interface IStyles {
	[key: string]: React.CSSProperties
}

interface IContactPage {
	styleProp?: IStyles
}

export const ContactPage: React.FC<IContactPage> = ({ styleProp }: IContactPage): JSX.Element => {

	const [error, setError] = useState({
		ok: true,
		message: ""
	});

	const [loading, setLoading] = useState(false);
	
	const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();
			setLoading(true);
			const { data } = await client.post("/email");
			setError({ok: true, message: ""});
			console.log(data);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setError({ok: false, message: "internal error"});
			console.log(error);
		}
	};

	return (
		<div style={{...styles.root, ...styleProp}}>
			<Card>
				<CardContent>
					<form onSubmit={async (e) => await handleSubmit(e)}>
						<AppInput
							placeholder="your email..."
							label="Email"
							type="email"
							disabled={loading}
							required
						/>
						<AppInput
							placeholder="your name..."
							label="Name"
							type="text"
							disabled={loading}
							required
						/>
						<MultiLineInput
							placeholder="your message..."
							label="Message"
							maxlength={500}
							disabled={loading}
							required
						/>
						<AppButton
							type="submit"
							text="send"
							styleProp={styles.button as IStyles}
							disabled={loading}
							endIcon={<SendIcon />}
						/>
					</form>
					<div style={styles.error}>
						{
							!error.ok && (
								<div style={{color: "salmon", textAlign: "left"}}>{error.message}</div>
							)
						}
					</div>
				</CardContent>
			</Card>
			<AppLoader visible={loading} />
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
	},
	error: {
		margin: "auto",
		width: "400px",
		textAlign: "center",
		paddingTop: "15px",
		paddingBottom: "15px"
	}
} as IStyles;