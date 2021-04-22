import { Router } from "express";

import Jwt from "../Helpers/Jwt";
import PaymentRepo from "../Repositories/PaymentRepository";
import { IInvoice, IPayPalInvoice } from "../Types/Abstract";

import Paypal from "../Helpers/Paypal";

const router = Router();

router.post("/pay", async (req, res) => {
	try {
		const invoices = req.body.cart as IInvoice[];

		let total = 0;
		let items: IPayPalInvoice[] = [];

		for (const invoice of invoices) {
			const item = await PaymentRepo.GetOne(invoice.itemId);

			items.push({
				name: item.name,
				sku: "001",
				price: item.price.toString(),
				currency: "USD",
				quantity: invoice.quantity
			});

			total += (item.price * Math.ceil(invoice.quantity));
		}

		const paymentUrl = await Paypal.PaymentTransport(items, total);
		res.json(paymentUrl);
	} catch (error) {
		res.json(error);
	}
});

router.get("/success/:pricejid", async (req, res) => {
	try {
		const payerId = req.query.PayerID as string;
		const paymentId = req.query.paymentId as string;
		const pricejid = req.params.pricejid as string;

		const { price } = Jwt.Verify(pricejid);
		if (!price) throw "invalid token";

		await Paypal.Pay(paymentId, payerId, price);

		const ok = Jwt.SignPaymentOk(true);
		res.redirect(`/paymentsuccess/${ok}`);
	} catch (error) {
		res.json(error);
	}
});

router.post("/success/verify", async (req, res) => {
	try {
		const ok = Jwt.VerifyOk(req.body.token);
		if (!ok) throw "invalid token";

		res.json({ ok: true });
	} catch (error) {
		res.json(error);
	}
});

router.get("/cancel", async (req, res) => {
	try {
		res.send("payment cancelled");
	} catch (error) {
		res.json(error);
	}
});

export default router;