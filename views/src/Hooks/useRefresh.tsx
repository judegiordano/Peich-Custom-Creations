import { useState } from "react";

import { client } from "../Api/Client";

interface IUseRefresh {
	refresh: () => Promise<void>,
	logout: () => Promise<void>,
	loading: boolean,
	isValid: boolean
}

export const useRefresh = (): IUseRefresh => {
	const [loading, setLoading] = useState(false);
	const [isValid, setIsValid] = useState(Boolean);

	const refresh = async () => {
		try {
			setLoading(true);
			const { data } = await client.post("/admin/refresh");

			if(!data.ok) {
				setIsValid(false);
				setLoading(false);
			}

			setIsValid(true);
			setLoading(false);
		} catch (error) {
			setIsValid(false);
			setLoading(false);
		}
	};

	const logout = async () => {
		try {
			const { data } = await client.post("/admin/logout");
			console.log(data);
			window.location.href = "/";
		} catch (error) {
			console.log(error);
			window.location.href = "/";
		}
	};

	return {
		refresh,
		loading,
		isValid,
		logout
	};
};