import Admin, { IAdmin } from "../Models/Admin";
import Password from "../Helpers/Password";

export default class UserRepository {

	public static async InsertAdmin(newAdmin: IAdmin): Promise<IAdmin> {
		try {
			const exists = await Admin.findOne({ username: newAdmin.username });
			if (exists) throw "username taken";

			const admin = new Admin();
			admin.username = newAdmin.username;
			admin.isNew = true;
			admin.password = await Password.Hash(newAdmin.password);

			return await admin.save();
		} catch (error) {
			throw Error(error);
		}
	}

	public static async Login(login: IAdmin): Promise<IAdmin> {
		try {
			const exists = await Admin.findOne({ username: login.username });
			if (!exists) throw "user not found";

			const compare = await Password.Compare(login.password, exists.password);
			if (!compare) throw "incorrect password";

			return exists;
		} catch (error) {
			throw Error(error);
		}
	}

	public static async FindById(_id: string): Promise<IAdmin> {
		try {
			const exists = await Admin.findOne({ _id });
			if (!exists) throw "user not found";

			return exists;
		} catch (error) {
			throw Error(error);
		}
	}

	public static async IncrementToken(_id: string): Promise<boolean> {
		try {
			const user = await Admin.findOne({ _id });
			if (!user) throw "user not found";

			user.tokenVersion += 1;
			await user.save();

			return true;
		} catch (error) {
			throw Error(error);
		}
	}
}
