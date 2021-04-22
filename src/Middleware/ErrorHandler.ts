import { Request, Response, NextFunction, Errback } from "express";

export default async (err: Errback, req: Request, res: Response, next: NextFunction):
	Promise<Response | void> => {
	if (!err) return next();

	console.log(err);
	return res.status(500).json({
		ok: false,
		status: 500,
		data: err.toString()
	});
};