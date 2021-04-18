import { Router } from "express";

import Product from "../Repositories/ProductRepository";

const router = Router();

router.get("/:id/:uid", async (req, res) => {
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

export default router;