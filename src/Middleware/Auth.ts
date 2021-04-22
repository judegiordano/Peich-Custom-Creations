import { Request, Response, NextFunction } from "express";

import Jwt from "../Helpers/Jwt";
import Admin from "../Repositories/AdminRepository";

export default async (req: Request, res: Response, next: NextFunction):
	Promise<Response | void> => {
	try {
		const token = req.signedCookies.jid;
		if (!token) throw "Missing Token";

		const payload = Jwt.VerifyUser(token);
		if (!payload) throw "Invalid Token";

		const user = await Admin.FindById(payload._id);
		if (payload.tokenVersion != user.tokenVersion) throw "Invalid Token";

		const newToken = Jwt.SignUser(user);

		res.locals.user = {
			_id: user._id,
			username: user.username,
			tokenVersion: user.tokenVersion
		};
		res.locals.newToken = newToken;
		return next();
	} catch (error) {
		next(error);
	}
};