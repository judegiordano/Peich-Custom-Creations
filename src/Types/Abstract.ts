import { TransportOptions } from "nodemailer";

interface IMailAuth {
	user: string,
	pass: string
}
export interface ImailTransporter extends TransportOptions {
	service: string,
	auth: IMailAuth
}

export interface IMailOptions {
	to: string,
	from?: string,
	subject: string,
	html?: string
	text?: string,
}

export interface IDevMail {
	preview: string | false,
	raw: any
}

export interface IInvoice {
	itemId: number,
	quantity: number
}

export interface IPayPalInvoice {
	name: string,
	sku: string,
	price: string,
	currency: string,
	quantity: number
}