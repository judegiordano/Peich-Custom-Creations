import path from "path";
import { cwd } from "process";
import Express from "express";
import compression from "compression";
import fileUpload from "express-fileupload";
import helmet from "helmet";
import cors from "cors";

import routes from "../Controllers/index";

const app = Express();

app.use(cors());
app.use(helmet({
	contentSecurityPolicy: false
}));
app.use(fileUpload());
app.use(Express.urlencoded({
	extended: true
}));
app.use(Express.json());
app.use(compression());
app.use(Express.static(path.join(cwd(), "/views/build")));

app.use("/api", routes);

app.get("*", (req, res) => {
	res.sendFile(path.join(cwd(), "views/build/index.html"));
});

export default app;