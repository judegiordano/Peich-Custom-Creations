import { Router } from "express";

import GalleryController from "./GalleryController";
import ProductController from "./ProductController";

const router = Router();

router.use("/products", ProductController);
router.use("/gallery", GalleryController);

export default router;