import * as dotenv from "dotenv";
import path from "path";
import os from "os";

import { Env, Host } from "../Types/Constants";
import { ImailTransporter } from "../Types/Abstract";

dotenv.config();

const config = {
	PORT: <number>parseInt(process.env.PORT) || 3000,
	HOST: <Host>(process.env.NODE_ENV == Env.prod ? process.env.HOST : Host.ip),
	ENV: <Env>process.env.NODE_ENV || Env.dev,
	IS_PROD: <boolean>(process.env.NODE_ENV == Env.prod) ? true : false,
	IS_COMPILED: <boolean>(path.extname(__filename).includes("js")) ? true : false,
	CORES: <number>os.cpus().length,
	CONNECTION_STRING: process.env.CONNECTION_STRING || undefined,
	MAIL_TRANSPORTER: {
		service: process.env.SMTP_SERVICE,
		auth: {
			user: process.env.EMAIL,
			pass: process.env.EMAIL_PASSWORD
		}
	} as ImailTransporter,
	CLIENT_EMAIL: process.env.CLIENT_EMAIL
};

if (config.CONNECTION_STRING == undefined) {
	throw new Error("CONNECTION_STRING is undefined");
}
if (config.MAIL_TRANSPORTER.auth.pass == undefined || config.MAIL_TRANSPORTER.auth.user == undefined || config.MAIL_TRANSPORTER.service == undefined) {
	throw new Error("MAIL_TRANSPORTER is undefined");
}
if (config.CLIENT_EMAIL == undefined) {
	throw new Error("CLIENT_EMAIL is undefined");
}

export default config;