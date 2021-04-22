import { Router } from "express";

import GalleryController from "./GalleryController";
import ProductController from "./ProductController";
import UtilController from "./UtilityController";
import PaymentController from "./PaymentController";

const router = Router();

router.use("/products", ProductController);
router.use("/gallery", GalleryController);
router.use("/util", UtilController);
router.use("/payment", PaymentController);

export default router;