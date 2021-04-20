import axios, { AxiosResponse } from "axios";

export default class Rest {

	private static readonly base = "";

	/**
	 *
	 *
	 * @static
	 * @param {string} url
	 * @return {*}  {Promise<AxiosResponse<unknown>>}
	 * @memberof Rest
	 */
	public static async Get(url: string): Promise<AxiosResponse<any>> {
		try {
			const response = await axios.get(`${Rest.base}${url}`);
			return response;
		} catch (error) {
			throw new Error(error);
		}
	}

	/**
	 *
	 *
	 * @static
	 * @param {string} url
	 * @param {unknown} body
	 * @return {*}  {Promise<AxiosResponse<unknown>>}
	 * @memberof Rest
	 */
	public static async Post(url: string, body?: unknown): Promise<AxiosResponse<any>> {
		try {
			const response = await axios.post(`${Rest.base}${url}`, body);
			return response;
		} catch (error) {
			throw new Error(error);
		}
	}
}