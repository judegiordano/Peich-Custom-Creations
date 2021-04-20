import mail from "nodemailer";

import config from "../Helpers/Config";
import { IMailOptions, IDevMail } from "../Types/Abstract";
import log from "./Logger";

export default class Mailer {

	private static readonly transporter = mail.createTransport(config.MAIL_TRANSPORTER);

	private static async DevMailer(options: IMailOptions): Promise<IDevMail> {

		const testAccount = await mail.createTestAccount();

		const temp = mail.createTransport({
			host: "smtp.ethereal.email",
			port: 587,
			secure: false,
			auth: {
				user: testAccount.user,
				pass: testAccount.pass
			}
		});

		return new Promise((resolve, reject) => {
			temp.sendMail(options, (error, info) => {
				if (error) return reject(error);

				return resolve({
					preview: mail.getTestMessageUrl(info),
					raw: info
				});
			});
		});
	}

	public static async SendEmail(options: IMailOptions): Promise<IDevMail | boolean> {
		if (!config.IS_PROD) return await Mailer.DevMailer(options);

		return new Promise((resolve, reject) => {
			Mailer.transporter.sendMail(options, (error, info) => {
				if (error) return reject(error);

				log.info(info);
				return resolve(true);
			});
		});
	}
}