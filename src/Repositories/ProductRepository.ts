import Product, { IProduct } from "../Models/Product";
import Utility from "../Services/Utility";

interface INewProduct {
	name: string,
	description: string,
	photo: Buffer,
	price: number
}

export default class UserRepository {

	public static async Insert(body: INewProduct): Promise<boolean> {
		try {
			const newProduct = new Product();
			newProduct.id = await Utility.Increment("Product");
			newProduct.name = body.name;
			newProduct.description = body.description;
			newProduct.photo = Buffer.from(body.photo).toString("base64");
			newProduct.price = body.price;
			newProduct.gallery = [];
			newProduct.tags = [];
			newProduct.isNew = true;

			await newProduct.save();
			return true;
		} catch (e) {
			throw Error(e);
		}
	}

	public static async GetOne(id: number): Promise<unknown> {
		try {
			const exists = await Product.findOne({ id });
			if (!exists) throw "product not found";

			let tempGallery: { uid: string }[] = [];

			exists.gallery.forEach(item => {
				tempGallery.push({
					uid: item.uid
				});
			});

			return {
				id: exists.id,
				name: exists.name,
				description: exists.description,
				photo: `${exists.photo.substring(0, 10)}...`,
				price: exists.price,
				gallery: tempGallery,
				added: exists.added,
				tags: exists.tags
			};
		} catch (error) {
			throw Error(error);
		}
	}

	public static async GetOnePhoto(id: number): Promise<IProduct> {
		try {
			const exists = await Product.findOne({ id });
			if (!exists) throw "product not found";

			return exists;
		} catch (error) {
			throw Error(error);
		}
	}

	public static async GetChunk(page: number, limit: number): Promise<IProduct[]> {
		try {
			return await Product.find().skip((page - 1) * limit).select("-gallery -photo -_id").limit(limit);
		} catch (error) {
			throw Error(error);
		}
	}

	public static async GetCount(): Promise<number> {
		try {
			return await Product.countDocuments();
		} catch (error) {
			throw Error(error);
		}
	}

	public static async UpdatePhoto(id: number, file: Buffer): Promise<boolean> {
		try {
			const exists = await Product.findOne({ id });
			if (!exists) throw "product not found";

			exists.photo = Buffer.from(file).toString("base64");
			await exists.save();

			return true;
		} catch (error) {
			throw Error(error);
		}
	}

	public static async AddGallery(id: number, file: Buffer): Promise<boolean> {
		try {
			const exists = await Product.findOne({ id });
			if (!exists) throw "product not found";

			exists.gallery.push({
				uid: Utility.RandomUid(20),
				photo: Buffer.from(file).toString("base64")
			});

			await exists.save();
			return true;
		} catch (error) {
			throw Error(error);
		}
	}

	public static async GetOneGallery(id: number, uid: string): Promise<string> {
		try {
			const exists = await Product.findOne({ id });
			if (!exists) throw "product not found";

			const filter = exists.gallery.filter(a => a.uid == uid)[0];
			return filter.photo;
		} catch (error) {
			throw Error(error);
		}
	}

	public static async GetMany(limit?: number): Promise<IProduct[]> {
		try {
			if (!limit || limit == 0)
				return await Product.find().select("-gallery -photo -_id");
			return await Product.find().select("-gallery -photo -_id").limit(limit);
		} catch (e) {
			throw Error(e);
		}
	}

	public static async Delete(id: number): Promise<boolean> {
		try {
			const exists = await Product.findOne({ id });
			if (!exists) throw "product not found";

			await exists.remove();
			return true;
		} catch (e) {
			throw Error(e);
		}
	}
}
