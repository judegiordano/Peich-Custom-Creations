import Product, { IProduct } from "../Models/Product";

export default class UserRepository {

	public static async GetOne(id: number): Promise<IProduct> {
		try {
			const exists = await Product.findOne({ id }).select("name price id");
			if (!exists) throw "product not found";

			return exists;
		} catch (error) {
			throw Error(error);
		}
	}
}
