import paypal from "paypal-rest-sdk";

import config from "../Helpers/Config";
import { IPayPalInvoice } from "../Types/Abstract";
import Jwt from "./Jwt";

paypal.configure({
	"mode": config.PAYPAL_MODE, //sandbox or live
	"client_id": config.PAYPAL_CLIENT_ID,
	"client_secret": config.PAYPAL_CLIENT_SECRET
});

export default class Paypal {

	public static async PaymentTransport(items: IPayPalInvoice[], total: number): Promise<string> {

		const invoice = {
			"intent": "sale",
			"payer": {
				"payment_method": "paypal"
			},
			"redirect_urls": {
				"return_url": `${config.PAYPAL_REDIRECT}success/${Jwt.Sign(total)}`,
				"cancel_url": `${config.PAYPAL_REDIRECT}cancel/`
			},
			"transactions": [{
				"item_list": {
					"items": items
				},
				"amount": {
					"currency": "USD",
					"total": total.toString()
				},
				"description": "A New Purchase Invoice"
			}]
		} as paypal.Payment;

		return new Promise((resolve, reject) => {
			paypal.payment.create(invoice, (error, payment) => {
				if (error) return reject(error);

				const link = payment.links.filter(l => l.rel == "approval_url")[0].href;
				return resolve(link);
			});
		});
	}

	public static async Pay(payment_id: string, payerId: string, total: number) {

		return new Promise((resolve, reject) => {
			const execute_payment_json = {
				"payer_id": payerId,
				"transactions": [{
					"amount": {
						"currency": "USD",
						"total": total
					}
				}]
			};
			paypal.payment.execute(payment_id, execute_payment_json, (error, payment) => {
				if (error) return reject(error);
				return resolve(payment);
			});
		});
	}
}