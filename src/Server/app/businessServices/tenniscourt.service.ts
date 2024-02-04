import { TennisCourtRepository } from "../persistence/tenniscourt.repository";
import { logger } from "../infrastructure/logger";
import { TennisCourt } from "../domain/tenniscourt.model";

export class TennisCourtService {
	private tennisCourtRepository: TennisCourtRepository;
	constructor() {
		this.tennisCourtRepository = new TennisCourtRepository();
	}

	async getAllTennisCourts(): Promise<TennisCourt[]> {
		let promise = new Promise<TennisCourt[]>(
			(resolve: Function, reject: Function) => {
				return this.tennisCourtRepository
					.ListAllTennisCourts()
					.then((books: TennisCourt[]) => {
						resolve(books);
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
