import React, { useState } from "react";

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
			const { data } = await client.post("admin/login", body);

			if(!data.ok) {
				throw new Error();
			}

			setError({ok: true, message: ""});
			setLoading(false);
			window.location.href = "/admin";
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
