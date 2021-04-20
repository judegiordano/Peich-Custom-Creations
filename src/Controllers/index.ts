import { Router } from "express";

import GalleryController from "./GalleryController";
import ProductController from "./ProductController";
import UtilController from "./UtilityController";

const router = Router();

router.use("/products", ProductController);
router.use("/gallery", GalleryController);
router.use("/util", UtilController);

export default router;