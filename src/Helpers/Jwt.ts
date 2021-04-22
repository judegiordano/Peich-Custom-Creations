import jwt from "jsonwebtoken";

import config from "./Config";

export default class Jwt {

	public static Sign(price: number): string {
		try {
			return jwt.sign({ price }, config.JWT_SECRET, {
				expiresIn: config.JWT_EXPIRATION
			});
		} catch (error) {
			throw Error(error);
		}
	}

	public static SignPaymentOk(ok: boolean): string {
		try {
			return jwt.sign({ ok }, config.JWT_SECRET, {
				expiresIn: config.JWT_EXPIRATION
			});
		} catch (error) {
			throw Error(error);
		}
	}

	public static Verify(token: string): { price: number } {
		try {
			const data = jwt.verify(token, config.JWT_SECRET) as { price: number };
			return {
				price: data.price
			};
		} catch (error) {
			throw Error(error);
		}
	}

	public static VerifyOk(token: string): boolean {
		try {
			const { ok } = jwt.verify(token, config.JWT_SECRET) as { ok: boolean };
			return ok;
		} catch (error) {
			throw Error(error);
		}
	}
}