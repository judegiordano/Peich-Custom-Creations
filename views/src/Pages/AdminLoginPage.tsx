import React, { useEffect, useState } from "react";
import SendIcon from "@material-ui/icons/Send";
import { Card, CardContent } from "@material-ui/core";
import { AppButton } from "../Components/AppButton";
import { AppInput } from "../Components/AppInput";
import { useLogin } from "../Hooks/useLogin";
import { AppLoader } from "../Components/AppLoader";
import { client } from "../Api/Client";
import { useHistory } from "react-router";

interface IStyles {
	[key: string]: React.CSSProperties
}

interface IAdminLoginPage {
	styleProp?: IStyles,
}

export const AdminLoginPage: React.FC<IAdminLoginPage> = ({ styleProp }: IAdminLoginPage): JSX.Element => {
	
	const history = useHistory();
	const { loading, login, setBody, body, error } = useLogin();
	const [checkLoad, setCheckLoad] = useState(true);

	const checkValid = async () => {
		try {
			setCheckLoad(true);
			const { data } = await client.post("/admin/refresh");
			if(data.ok) history.push("/admin");
			setCheckLoad(false);
		} catch (error) {
			setCheckLoad(false);
		}
	};

	useEffect(() => {
		checkValid();
	}, []);

	if(checkLoad) {
		return (
			<AppLoader visible={true} />
		);
	}

	return (
		<div style={{...styles.root, ...styleProp}}>
			<Card>
				<CardContent>
					<form onSubmit={(e) => login(e)}>
						<AppInput
							placeholder="username..."
							label="Username"
							type="text"
							disabled={loading}
							required
							onChange={e => {
								setBody({
									...body,
									username: e.target.value
								});
							}}
						/>
						<AppInput
							placeholder="password..."
							label="Password"
							type="password"
							disabled={loading}
							required
							onChange={e => {
								setBody({
									...body,
									password: e.target.value
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