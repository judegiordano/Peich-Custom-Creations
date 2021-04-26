import { Router } from "express";
import { UploadedFile, FileArray } from "express-fileupload";

import { IAdmin } from "../Models/Admin";
import Jwt from "../Helpers/Jwt";
import Utility from "../Services/Utility";
import Auth from "../Middleware/Auth";
import config from "../Helpers/Config";
import AdminRepository from "../Repositories/AdminRepository";
import Product from "../Repositories/ProductRepository";

const router = Router();

router.get("/productnames", async (req, res, next) => {
	try {
		const products = await Product.GetProductNames();

		res.json({
			ok: true,
			products
		});
	} catch (error) {
		next(error);
	}
});

router.post("/login", async (req, res, next) => {
	try {
		const login = req.body as IAdmin;

		const admin = await AdminRepository.Login(login);
		const token = Jwt.SignUser(admin);

		Utility.SetCookie(res, "jid", token);

		res.json({
			ok: true,
			token
		});
	} catch (error) {
		next(error);
	}
});

router.post("/refresh", Auth, async (req, res, next) => {
	try {
		Utility.SetCookie(res, "jid", res.locals.newToken);

		res.json({
			ok: true,
			data: res.locals.user,
			token: res.locals.newToken
		});
	} catch (error) {
		next(error);
	}
});

router.post("/addproduct", Auth, async (req, res, next) => {
	try {
		const { description, name, price } = req.body;
		const { data } = req.files.picture as UploadedFile;

		let buffers: Buffer[] = [];
		for (const key in req.files) {
			if (/.*gallery.*/.test(key)) {
				const pics = req.files as FileArray;

				const { data } = pics[key] as UploadedFile;
				buffers.push(data);
			}
		}

		const newProduct = await Product.Insert({
			description,
			name,
			price,
			photo: data,
			gallery: buffers
		});

		res.json({
			ok: newProduct,
			data: "item inserted"
		});
	} catch (error) {
		next(error);
	}
});

router.post("/logout", Auth, async (req, res, next) => {
	try {
		res.cookie("jid", "401", {
			maxAge: 0,
			path: "/",
			httpOnly: true,
			secure: config.IS_PROD,
			signed: true,
			sameSite: true,
		});

		res.json({
			ok: true,
			data: "You have logged out"
		});
	} catch (error) {
		next(error);
	}
});

router.delete("/product/:id", Auth, async (req, res, next) => {
	try {
		res.json({
			deleted: await Product.Delete(parseInt(req.params.id as string))
		});
	} catch (error) {
		next(error);
	}
});

export default router;