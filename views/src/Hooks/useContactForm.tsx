import React, { useRef, useState } from "react";
import { useHistory } from "react-router";
import ReCAPTCHA from "react-google-recaptcha";

import { client } from "../Api/Client";

interface IUseContactForm {
	error: { ok: boolean, message: string },
	loading: boolean,
	contact: (e: React.FormEvent<HTMLFormElement>) => Promise<void>,
	body: {
		email: string;
		name: string;
		message: string;
	},
	setBody: React.Dispatch<React.SetStateAction<{
		email: string;
		name: string;
		message: string;
	}>>,
	reRef: React.MutableRefObject<ReCAPTCHA | undefined>
}

export const useContactForm = (): IUseContactForm => {

	const reRef = useRef<ReCAPTCHA>();
	const history = useHistory();

	const [error, setError] = useState({
		ok: true,
		message: ""
	});

	const [body, setBody] = useState({
		email: "",
		name: "",
		message: ""
	});

	const [loading, setLoading] = useState(false);
	
	const contact = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();
			const token = await reRef.current?.executeAsync();
			reRef.current?.reset();

			setLoading(true);
			const { data } = await client.post("/util/contact", {
				...body,
				token: token
			});

			if(data.ok) {
				setError({ok: true, message: ""});
				setLoading(false);
				history.push({
					pathname: "/emailsuccess",
					state: { name: body.name }
				});
			}
			else throw new Error();
		} catch (error) {
			setError({ok: false, message: "internal error"});
			setLoading(false);
		}
	};

	return {
		error,
		loading,
		contact,
		body,
		setBody,
		reRef
	};
};
