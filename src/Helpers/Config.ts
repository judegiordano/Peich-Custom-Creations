import * as dotenv from "dotenv";
import path from "path";
import os from "os";

import { Env, Host } from "../Types/Constants";

dotenv.config();

const config = {
	PORT: <number>parseInt(process.env.PORT) || 3000,
	HOST: <Host>(process.env.NODE_ENV == Env.prod ? process.env.HOST : Host.ip),
	ENV: <Env>process.env.NODE_ENV || Env.dev,
	IS_PROD: <boolean>(process.env.NODE_ENV == Env.prod) ? true : false,
	IS_COMPILED: <boolean>(path.extname(__filename).includes("js")) ? true : false,
	CORES: <number>os.cpus().length,
	CONNECTION_STRING: process.env.CONNECTION_STRING || undefined
};

export default config;