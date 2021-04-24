import React, { useState } from "react";
import { useHistory } from "react-router";

import { client } from "../Api/Client";

interface IUseLogin {
	error: { ok: boolean, message: string },
	loading: boolean,
	login: (e: React.FormEvent<HTMLFormElement>) => Promise<void>,
	setBody: React.Dispatch<React.SetStateAction<{
		username: string;
		password: string;
	}>>
	body: {
		username: string,
		password: string
	}
}

export const useLogin = (): IUseLogin => {

	const history = useHistory();

	const [error, setError] = useState({
		ok: true,
		message: ""
	});

	const [body, setBody] = useState({
		username: "",
		password: "",
	});

	const [loading, setLoading] = useState(false);
	
	const login = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();

			setLoading(true);
			const { data } = await client.post("/admin/login", body);

			if(data.ok) {
				setError({ok: true, message: ""});
				setLoading(false);
				history.push({
					pathname: "/admin",
				});
			}
			else throw new Error();
		} catch (error) {
			console.log(error);
			console.log(error.message);
			setError({ok: false, message: "internal error"});
			setLoading(false);
		}
	};

	return {
		error,
		loading,
		login,
		setBody,
		body
	};
};
