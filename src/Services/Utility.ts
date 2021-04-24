import mongoose from "mongoose";
import { Response } from "express";
import fs from "fs";

import config from "../Helpers/Config";
import Rest from "../Helpers/Rest";

export default class Utility {

	private static chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"

	private static Shuffle(array: number[] | string[]): number[] | string[] {
		let cur = array.length;
		let temp, rand;

		while (0 !== cur) {
			rand = Math.floor(Math.random() * cur);
			cur -= 1;

			temp = array[cur];
			array[cur] = array[rand];
			array[rand] = temp;
		}
		return array;
	}

	public static RandomNumber(): number {
		try {
			const _arr: number[] = Array.from(String(Date.now()), Number);
			const _rand: number[] = Utility.Shuffle(_arr) as number[];
			const uid = Number(_rand.join(""));
			return uid;
		} catch (error) {
			throw new Error(error);
		}
	}

	public static RandomUid(len: number): string {
		try {
			let uid = "";
			while (uid.length <= len) {
				const _arr: string[] = Array.from(String(Utility.chars), String);
				const _rand: string[] = Utility.Shuffle(_arr) as string[];
				uid += String(_rand.join(""));
			}
			if (uid.length > len) {
				uid = uid.substr(0, len);
			}
			return uid;
		} catch (error) {
			throw new Error(error);
		}
	}

	public static EncodeBase64(file: number | fs.PathLike): string {
		try {
			return fs.readFileSync(file, "base64");
		} catch (error) {
			throw new Error(error);
		}
	}

	public static BufferToBase64(buffer: Buffer): string {
		try {
			return Buffer.from(buffer).toString("base64");
		} catch (error) {
			throw new Error(error);
		}
	}

	public static async Increment(collection: string): Promise<number> {
		try {
			const increment: any = await mongoose.model(collection).find({}).select("id -_id").sort({ id: -1 }).limit(1);
			if (increment.length <= 0 || increment.length === undefined) {
				return 1;
			}
			return increment[0]._doc.id + 1;
		} catch (error) {
			throw new Error(error);
		}
	}

	public static async ValidateCaptcha(token: string): Promise<boolean> {
		try {
			const { CAPTCHA_SECRET_KEY } = config;
			const response = await Rest.Post(`https://www.google.com/recaptcha/api/siteverify?secret=${CAPTCHA_SECRET_KEY}&response=${token}`);
			return response.data.success as boolean;
		} catch (error) {
			throw new Error(error);
		}
	}

	public static SetCookie(res: Response, cookieName: string, cookieValue: string, maxAge?: number): void {
		res.cookie(cookieName, cookieValue, {
			maxAge: maxAge || 1000 * 60 * 60 * 24 * 7,
			path: "/",
			httpOnly: true,
			secure: config.IS_PROD,
			signed: true,
			sameSite: true,
		});
	}

	public static Logout(res: Response, cookieName: string): void {
		res.cookie(cookieName, "", {
			maxAge: 0,
			path: "/",
			httpOnly: true,
			secure: config.IS_PROD,
			signed: true,
			sameSite: true,
		});
	}

	public static ClearCookie(res: Response, cookieName: string): void {
		res.clearCookie(cookieName, {
			maxAge: 0,
			path: "/",
			httpOnly: true,
			secure: config.IS_PROD,
			signed: true,
			sameSite: true,
		});
	}
}