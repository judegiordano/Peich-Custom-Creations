import { Router } from "express";

import Utility from "../Services/Utility";
import Admin from "../Repositories/AdminRepository";
import config from "../Helpers/Config";
import Mail from "../Services/Mailer";
import DevAuth from "../Middleware/DevAuth";
import { IAdmin } from "../Models/Admin";

const router = Router();

router.post("/contact", async (req, res, next) => {
	try {
		const { email, name, message, token } = req.body;
		if (!email || !name || !message || !token) throw "missing body requirements";

		const isHuman = await Utility.ValidateCaptcha(token);
		if (!isHuman) throw "captcha failed";

		const mail = await Mail.SendEmail({
			to: config.CLIENT_EMAIL,
			from: email,
			subject: `new message from ${email}`,
			html: `<h4>new message from <bold>${email}</bold></h4><br>Name: ${name}<br><br>${message}`
		});

		res.json({
			ok: true,
			data: mail
		});
	} catch (error) {
		next(error);
	}
});

router.delete("/revoke/:_id", DevAuth, async (req, res, next) => {
	try {
		const { _id } = req.params;
		const success = await Admin.IncrementToken(_id);
		res.json({ success });
	} catch (error) {
		next(error);
	}
});

router.post("/insert/admin", DevAuth, async (req, res, next) => {
	try {
		const register = req.body as IAdmin;
		const success = await Admin.InsertAdmin(register);
		res.json({ success });
	} catch (error) {
		next(error);
	}
});

export default router;