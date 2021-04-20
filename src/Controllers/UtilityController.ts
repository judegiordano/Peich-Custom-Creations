import { Router } from "express";

import config from "../Helpers/Config";
import Mail from "../Services/Mailer";

const router = Router();

router.post("/contact", async (req, res) => {
	try {
		const { email, name, message } = req.body;
		if (!email || !name || !message) throw "missing body requirements";

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