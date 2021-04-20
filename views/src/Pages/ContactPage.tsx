import React from "react";
import { Card, CardContent } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import ReCAPTCHA from "react-google-recaptcha";

import { AppButton } from "../Components/AppButton";
import { AppInput } from "../Components/AppInput";
import { MultiLineInput } from "../Components/MultiLineInput";
import { AppLoader } from "../Components/AppLoader";
import { useContactForm } from "../Hooks/useContactForm";
import { config } from "../Config/Config";

interface IStyles {
	[key: string]: React.CSSProperties
}

interface IContactPage {
	styleProp?: IStyles
}

export const ContactPage: React.FC<IContactPage> = ({ styleProp }: IContactPage): JSX.Element => {

	const { error, loading, contact, body, setBody, reRef } = useContactForm();

	return (
		<div style={{...styles.root, ...styleProp}}>
			<Card>
				<CardContent>
					<form onSubmit={(e) => contact(e)}>
						<AppInput
							placeholder="your email..."
							label="Email"
							type="email"
							disabled={loading}
							required
							onChange={e => {
								setBody({
									...body,
									email: e.target.value
								});
							}}
						/>
						<AppInput
							placeholder="your name..."
							label="Name"
							type="text"
							disabled={loading}
							required
							onChange={e => {
								setBody({
									...body,
									name: e.target.value
								});
							}}
						/>
						<MultiLineInput
							placeholder="your message..."
							label="Message"
							maxlength={500}
							disabled={loading}
							required
							onChange={e => {
								setBody({
									...body,
									message: e.target.value
								});
							}}
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
			<ReCAPTCHA
				sitekey={config.client_key}
				size="invisible"
				ref={reRef as React.LegacyRef<ReCAPTCHA>}
			/>
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
		maxWidth: "200px"
	},
	error: {
		margin: "auto",
		width: "400px",
		textAlign: "center",
		paddingTop: "15px",
		paddingBottom: "15px"
	}
} as IStyles;