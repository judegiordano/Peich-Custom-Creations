import { Request, Response, NextFunction } from "express";

import jwt from "../Helpers/Jwt";

export default async (req: Request, res: Response, next: NextFunction):
	Promise<Response | void> => {
	try {
		const authHeader = req.headers.authorization;
		const token = authHeader && authHeader.split(" ")[1];
		if (!token) throw "Missing Token";

		const payload = jwt.Verify(token);
		if (!payload) throw "Invalid Token";

		res.locals.jwt = payload;
		return next();
	} catch (error) {
		next(error);
	}
};