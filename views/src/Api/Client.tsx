import axios from "axios";

import { config } from "../Config/Config";

export const client = axios.create({
	withCredentials: true,
	baseURL: config.apibase,
	headers: {
		"Accept": "application/json, text/plain, */*",
		"Content-Type": "application/json",
	}
});