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
			async (resolve: Function, reject: Function) => {
				try {
					const tennisCourts =
						await this.tennisCourtRepository.ListAllTennisCourts();
					resolve(tennisCourts);
				} catch (error) {
					logger.error(error.message);
					reject(error);
				}
			}
		);
		return promise;
	}
}
