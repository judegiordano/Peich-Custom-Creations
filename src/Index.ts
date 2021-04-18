import cluster from "cluster";

import connect from "./Services/Database";
import config from "./Helpers/Config";
import log from "./Services/Logger";
import app from "./Services/Server";

const start = async () => {
	try {
		await connect();
		app.listen(config.PORT);
		log.info(`listening on http://${config.HOST}:${config.PORT}/`);
	} catch (error) {
		log.error(error);
		process.exit(1);
	}
};

if (cluster.isMaster) {
	for (let i = 0; i < config.CORES; i++) {
		cluster.fork();
	}
}
else start();
