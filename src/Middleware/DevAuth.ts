import { Request, Response, NextFunction } from "express";

import config from "../Helpers/Config";

export default async (req: Request, res: Response, next: NextFunction):
	Promise<Response | void> => {
	try {
		const token = req.headers.appcode;
		if (!token) throw "missing auth";

		if (token != config.APP_CODE) throw "invalid auth";

		return next();
	} catch (error) {
		next(error);
	}
};