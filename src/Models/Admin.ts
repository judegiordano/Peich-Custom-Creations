import mongoose, { Document } from "mongoose";

export interface IAdmin extends Document {
	_id?: string,
	username: string,
	password: string,
	tokenVersion?: number
}

const Admin = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: false
		},
		tokenVersion: {
			type: Number,
			required: false,
			default: 0
		}
	},
	{
		collection: "Admin",
		versionKey: false
	}
);

export default mongoose.model<IAdmin>("Admin", Admin);
