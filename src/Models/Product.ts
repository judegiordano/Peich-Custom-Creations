import mongoose, { Document } from "mongoose";

interface IGallery {
	uid: string,
	photo: string
}

export interface IProduct extends Document {
	_id: string,
	id: number,
	name: string,
	description: string
	photo: string,
	price: number
	gallery: IGallery[]
	tags: string[]
	added: Date
}

const Product = new mongoose.Schema(
	{
		id: {
			type: Number,
			default: 1,
			required: true
		},
		name: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: false
		},
		photo: {
			type: String,
			required: false
		},
		price: {
			type: Number,
			required: true
		},
		gallery: {
			type: Array,
			required: false
		},
		tags: {
			type: Array,
			required: false
		},
		added: {
			type: Date,
			default: new Date()
		}
	},
	{
		collection: "Product",
		versionKey: false
	}
);

export default mongoose.model<IProduct>("Product", Product);
