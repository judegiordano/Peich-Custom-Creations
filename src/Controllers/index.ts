import { Router } from "express";

import GalleryController from "./GalleryController";
import ProductController from "./ProductController";
import UtilController from "./UtilityController";
import PaymentController from "./PaymentController";
import AdminController from "./AdminController";

const router = Router();

router.use("/products", ProductController);
router.use("/gallery", GalleryController);
router.use("/util", UtilController);
router.use("/payment", PaymentController);
router.use("/admin", AdminController);

export default router;