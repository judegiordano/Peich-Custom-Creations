import { Router } from "express";

import Utility from "../Services/Utility";
import config from "../Helpers/Config";
import Mail from "../Services/Mailer";

const router = Router();

router.post("/contact", async (req, res) => {
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
		res.json(error);
	}
});

export default router;