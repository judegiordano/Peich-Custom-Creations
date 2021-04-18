import path from "path";
import { cwd } from "process";
import cluster from "cluster";
import Express from "express";
import compression from "compression";
import fileUpload, { UploadedFile } from "express-fileupload";
import helmet from "helmet";
import cors from "cors";

import connect from "./Services/Database";
import config from "./Helpers/Config";
import log from "./Services/Logger";

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

import Product from "./Repositories/ProductRepository";

app.post("/api/products/add", async (req, res) => {
	try {
		if (!req.files)
			throw "No file uploaded";

		const { data } = req.files.photo as UploadedFile;
		const newProduct = await Product.Insert({
			...req.body,
			photo: data
		});

		res.json({
			success: newProduct
		});
	} catch (error) {
		res.json(error);
	}
});

app.post("/api/products/image/update/:id", async (req, res) => {
	try {
		if (!req.files)
			throw "No file uploaded";

		const { data } = req.files.photo as UploadedFile;

		res.json({
			success: await Product.UpdatePhoto(parseInt(req.params.id as string), data)
		});
	} catch (error) {
		res.json(error);
	}
});

app.post("/api/products/gallery/add/:id", async (req, res) => {
	try {
		if (!req.files)
			throw "No file uploaded";

		const { data } = req.files.photo as UploadedFile;

		res.json({
			success: await Product.AddGallery(parseInt(req.params.id as string), data)
		});
	} catch (error) {
		res.json(error);
	}
});

app.get("/api/products/:id", async (req, res) => {
	try {
		res.json({
			product: await Product.GetOne(parseInt(req.params.id as string))
		});
	} catch (error) {
		res.json(error);
	}
});

app.get("/api/products/image/:id", async (req, res) => {
	try {
		const product = await Product.GetOnePhoto(parseInt(req.params.id as string));
		const image: Buffer = Buffer.from(product.photo, "base64");
		res.type("image/png").send(image);
	} catch (error) {
		res.json(error);
	}
});

app.get("/api/gallery/:id/:uid", async (req, res) => {
	try {
		const photoId = parseInt(req.params.id as string);
		const galleryUid = req.params.uid as string;

		const galleryImage = await Product.GetOneGallery(photoId, galleryUid);
		const image: Buffer = Buffer.from(galleryImage, "base64");

		res.type("image/png").send(image);
	} catch (error) {
		res.json(error);
	}
});

app.get("/api/products", async (req, res) => {
	try {
		res.json({
			products: await Product.GetMany(parseInt(req.query.limit as string))
		});
	} catch (error) {
		res.json(error);
	}
});

app.delete("/api/products/:id", async (req, res) => {
	try {
		res.json({
			product: await Product.Delete(parseInt(req.params.id as string))
		});
	} catch (error) {
		res.json(error);
	}
});

app.get("*", (req, res) => {
	res.sendFile(path.join(cwd(), "views/build/index.html"));
});

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
