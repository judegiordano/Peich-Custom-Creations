import { useState } from "react";
import { useHistory } from "react-router";

import { client } from "../Api/Client";

interface IUseRefresh {
	refresh: () => Promise<void>,
	logout: () => Promise<void>,
	loading: boolean,
	isValid: boolean
}

export const useRefresh = (): IUseRefresh => {
	const history = useHistory();
	const [loading, setLoading] = useState(false);
	const [isValid, setIsValid] = useState(false);

	const refresh = async () => {
		try {
			setLoading(true);
			const { data } = await client.post("/admin/refresh");

			if(!data.ok) {
				setLoading(false);
				setIsValid(false);
			}

			setIsValid(true);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setIsValid(true);
		}
	};

	const logout = async () => {
		try {
			const { data } = await client.post("/admin/logout");
			console.log(data);
			history.push("/");
		} catch (error) {
			history.push("/");
			console.log(error);
		}
	};

	return {
		refresh,
		loading,
		isValid,
		logout
	};
};