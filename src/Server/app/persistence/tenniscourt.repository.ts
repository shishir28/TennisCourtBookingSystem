import { TennisCourt } from "../domain/tenniscourt.model";
import { DBContext } from "./DBContext";

export class TennisCourtRepository {
	private dbContext: DBContext;

	constructor() {
		this.dbContext = DBContext.getInstance();
	}

	async ListAllTennisCourts(): Promise<TennisCourt[]> {
		const collectionName: string = "tennisCourts";
		const snapshot = await this.dbContext.db.collection(collectionName).get();

		if (snapshot.empty) {
			console.log("No documents found for tennis courts.");
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
