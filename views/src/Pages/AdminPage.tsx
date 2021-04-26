import React from "react";
import { Redirect } from "react-router";
import { AddNewItem } from "../Components/Admin/AddNewItem";

import { AppButton } from "../Components/AppButton";
import { AppLoader } from "../Components/AppLoader";
import { useRefresh } from "../Hooks/useRefresh";

interface IStyles {
	[key: string]: React.CSSProperties
}

interface IAdminPage {
	styleProp?: IStyles,
	auth: boolean
}

export const AdminPage: React.FC<IAdminPage> = ({ styleProp, auth }: IAdminPage): JSX.Element => {

	const { loading, logout } = useRefresh();

	if (!auth) return <Redirect to="/admin/login" />;

	return (
		loading ? (
			<AppLoader visible={true} />
		) : (
			<div style={{ ...styles.root, ...styleProp }}>
				<AppButton styleProp={styles.button as IStyles} text="logout" onClick={() => logout()} />
				<AddNewItem />
			</div>
		)
	);
};

const styles = {
	root: {
		margin: "auto",
		padding: "10px",
		textAlign: "center"
	},
	button: {
		maxWidth: "200px"
	}
} as IStyles;