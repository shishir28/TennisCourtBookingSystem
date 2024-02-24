import { TennisCourt } from "../domain/tenniscourt.model";
import { AppContext } from "../AppContext";
import { logger } from "../infrastructure";

export class TennisCourtRepository {
	private appContext: AppContext;
	constructor() {
		this.appContext = AppContext.getInstance();
	}

	async ListAllTennisCourts(): Promise<TennisCourt[]> {
		const collectionName: string = "tennisCourts";
		const snapshot = await this.appContext.db.collection(collectionName).get();

		if (snapshot.empty) {
			logger.info("No documents found for tennis courts.");
			return [];
		}

		const data: TennisCourt[] = [];
		snapshot.forEach((doc) => {
			const rawData = doc.data();
			data.push({
				id: rawData.id,
				courtName: rawData.name,
			});
		});
		return data;
	}
}
