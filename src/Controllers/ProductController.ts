import { Router } from "express";
import { UploadedFile } from "express-fileupload";

import Product from "../Repositories/ProductRepository";
import DevAuth from "../Middleware/DevAuth";

const router = Router();

/** 
 * /api/products?limit={number}
 * 
*/
router.get("/", async (req, res) => {
	try {
		res.json({
			products: await Product.GetMany(parseInt(req.query.limit as string))
		});
	} catch (error) {
		res.json(error);
	}
});

/** 
 * /api/products/{id:number}
 * 
*/
router.get("/:id", async (req, res) => {
	try {
		res.json({
			product: await Product.GetOne(parseInt(req.params.id as string))
		});
	} catch (error) {
		res.json(error);
	}
});

/** 
 * /api/products/image/{id:number}
 * 
*/
router.get("/image/:id", async (req, res) => {
	try {
		const product = await Product.GetOnePhoto(parseInt(req.params.id as string));
		const image: Buffer = Buffer.from(product.photo, "base64");
		res.type("image/png").send(image);
	} catch (error) {
		res.json(error);
	}
});

/** 
 * /api/products/{id:number}
 * 
*/
router.delete("/:id", DevAuth, async (req, res) => {
	try {
		res.json({
			product: await Product.Delete(parseInt(req.params.id as string))
		});
	} catch (error) {
		res.json(error);
	}
});

router.post("/add", DevAuth, async (req, res) => {
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

router.post("/image/update/:id", DevAuth, async (req, res) => {
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

router.post("/gallery/add/:id", DevAuth, async (req, res) => {
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

export default router;