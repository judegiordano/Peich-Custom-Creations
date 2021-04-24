import { Router } from "express";

import { IAdmin } from "../Models/Admin";
import Jwt from "../Helpers/Jwt";
import Utility from "../Services/Utility";
import Auth from "../Middleware/Auth";
import config from "../Helpers/Config";
import AdminRepository from "../Repositories/AdminRepository";

const router = Router();

router.post("/login", async (req, res, next) => {
	try {
		const login = req.body as IAdmin;

		const admin = await AdminRepository.Login(login);
		const token = Jwt.SignUser(admin);

		Utility.SetCookie(res, "jid", token);

		res.json({
			ok: true,
			token
		});
	} catch (error) {
		next(error);
	}
});

router.post("/refresh", Auth, async (req, res, next) => {
	try {
		Utility.SetCookie(res, "jid", res.locals.newToken);

		res.json({
			ok: true,
			data: res.locals.user,
			token: res.locals.newToken
		});
	} catch (error) {
		next(error);
	}
});

router.post("/logout", Auth, async (req, res, next) => {
	try {
		res.cookie("jid", "401", {
			maxAge: 0,
			path: "/",
			httpOnly: true,
			secure: config.IS_PROD,
			signed: true,
			sameSite: true,
		});

		res.json({
			ok: true,
			data: "You have logged out"
		});
	} catch (error) {
		next(error);
	}
});

export default router;