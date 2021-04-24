import React from "react";
import { Redirect } from "react-router";

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

	if(!auth) return <Redirect to="/admin/login" />;

	return (
		loading ? (
			<AppLoader  visible={true}/>
		) : (
			<div style={{...styles.root, ...styleProp}}>
					protected route
				<AppButton styleProp={{maxWidth: "200px"} as IStyles} text="logout" onClick={() => logout()}/>
			</div>
		)
	);
};

const styles = {
	root: {
		textAlign: "center"
	}
} as IStyles;