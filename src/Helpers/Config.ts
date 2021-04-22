import * as dotenv from "dotenv";
import path from "path";
import os from "os";

import { Env, Host, PayPalMode } from "../Types/Constants";
import { ImailTransporter } from "../Types/Abstract";

dotenv.config();

const config = {
	// sys
	PORT: <number>parseInt(process.env.PORT) || 3000,
	HOST: <Host>(process.env.NODE_ENV == Env.prod ? process.env.HOST : Host.ip),
	ENV: <Env>process.env.NODE_ENV || Env.dev,
	IS_PROD: <boolean>(process.env.NODE_ENV == Env.prod) ? true : false,
	IS_COMPILED: <boolean>(path.extname(__filename).includes("js")) ? true : false,
	CORES: <number>os.cpus().length,
	// db
	CONNECTION_STRING: process.env.CONNECTION_STRING || undefined,
	// smtp
	MAIL_TRANSPORTER: {
		service: process.env.SMTP_SERVICE,
		auth: {
			user: process.env.EMAIL,
			pass: process.env.EMAIL_PASSWORD
		}
	} as ImailTransporter,
	// captcha
	CLIENT_EMAIL: process.env.CLIENT_EMAIL || undefined,
	CAPTCHA_SECRET_KEY: process.env.CAPTCHA_SECRET_KEY || undefined,
	// paypal
	PAYPAL_MODE: process.env.NODE_ENV == Env.prod ? PayPalMode.live : PayPalMode.sandbox,
	PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || undefined,
	PAYPAL_CLIENT_SECRET: process.env.PAYPAL_CLIENT_SECRET || undefined,
	PAYPAL_REDIRECT: process.env.NODE_ENV == Env.prod ? "https://peichcreations.herokuapp.com/api/payment/" : "http://127.0.0.1:4000/api/payment/",
	// jwt
	JWT_SECRET: process.env.JWT_SECRET || undefined,
	JWT_EXPIRATION: "7d",
};

if (!config.CONNECTION_STRING) {
	throw new Error("CONNECTION_STRING is undefined");
}
if (!config.MAIL_TRANSPORTER.auth.pass || !config.MAIL_TRANSPORTER.auth.user || !config.MAIL_TRANSPORTER.service) {
	throw new Error("MAIL_TRANSPORTER is undefined");
}
if (!config.CLIENT_EMAIL) {
	throw new Error("CLIENT_EMAIL is undefined");
}
if (!config.CAPTCHA_SECRET_KEY) {
	throw new Error("CAPTCHA_SECRET_KEY is undefined");
}
if (!config.PAYPAL_CLIENT_ID || !config.PAYPAL_CLIENT_SECRET) {
	throw new Error("PAYPAL is undefined");
}
if (!config.JWT_SECRET) {
	throw new Error("JWT_SECRET is undefined");
}

export default config;