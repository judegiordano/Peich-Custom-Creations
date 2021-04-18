import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

interface ISetError {
	ok: boolean,
	errorMsg: string
}

interface IUseErrorHandler {
	setError: React.Dispatch<React.SetStateAction<ISetError>>
}

export const useErrorHandler = () : IUseErrorHandler => {

	const history = useHistory();

	const [ error, setError ] = useState({
		ok: true,
		errorMsg: ""
	});

	useEffect(() => {
		if(!error.ok) {
			history.push({
				pathname: "/error",
				state: { errorMsg: error.errorMsg }
			});
		}
	}, [error]);

	return {
		setError
	};
};