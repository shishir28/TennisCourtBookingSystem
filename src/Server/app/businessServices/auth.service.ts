import { UserRecord } from "firebase-admin/lib/auth/user-record";
import { AppContext } from "../AppContext";
import { logger } from "../infrastructure";

export class AuthService {
	private appContext: AppContext;

	constructor() {
		this.appContext = AppContext.getInstance();
	}

	async signup(email: string, password: string): Promise<UserRecord> {
		let promise = new Promise<UserRecord>(
			(resolve: Function, reject: Function) => {
				return this.appContext.auth
					.createUser({
						email: email,
						password: password,
					})
					.then((userRecord: UserRecord) => {
						resolve(userRecord);
					})
					.catch((error: Error) => {
						logger.error(error.message);
						reject(error);
					});
			}
		);
		return promise;
	}
}
