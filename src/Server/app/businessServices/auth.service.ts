import { UserRecord } from "firebase-admin/lib/auth/user-record";
import { DBContext } from "../persistence/DBContext";

export class AuthService {
	private dbContext: DBContext;

	constructor() {
		this.dbContext = DBContext.getInstance();
	}

	async signup(email: string, password: string): Promise<UserRecord> {
		let promise = new Promise<UserRecord>(
			(resolve: Function, reject: Function) => {
				return this.dbContext.auth
					.createUser({
						email: email,
						password: password,
					})
					.then((userRecord: UserRecord) => {
						resolve(userRecord);
					})
					.catch((error: Error) => {
						// logger.error(error.message);
						reject(error);
					});
			}
		);
		return promise;
	}
}
