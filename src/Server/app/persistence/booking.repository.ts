import { AppContext } from "../AppContext";
import { Booking } from "../domain/tenniscourt.model";

export class BookingRepository {
	private appContext: AppContext;

	constructor() {
		this.appContext = AppContext.getInstance();
	}

	async Insert(model: Booking): Promise<Booking> {
		const collectionName: string = "bookings";
		const documentReference = await this.appContext.db
			.collection(collectionName)
			.add(model);
		const newId = documentReference.id;
		model.id = newId;
		return model;
	}

	async Update(identifier: string): Promise<Boolean> {
		const collectionName: string = "bookings";
		const documentReference = this.appContext.db
			.collection(collectionName)
			.doc(identifier)
			.update({ status: "Completed" });
		const res = documentReference.then(() => {
			return true;
		});
		return res;
	}

	async GetBookings(
		courtId: string,
		beginDate: Date,
		endDate: Date
	): Promise<Booking[]> {
		const collectionName: string = "bookings";
		const documentReference = this.appContext.db
			.collection(collectionName)
			.where("courtId", "==", courtId)
			.where("date", ">=", beginDate)
			.where("date", "<=", endDate);
		const res = documentReference.get().then((snapshot) => {
			const data: Booking[] = [];
			snapshot.forEach((doc) => {
				const rawData = doc.data();
				data.push({
					id: rawData.id,
					courtId: rawData.courtId,
					userId: rawData.userId,
					startTime: rawData.startTime,
					endTime: rawData.endTime,
					date: rawData.date,
					status: rawData.status,
				});
			});
			return data;
		});

		return res;
	}
}
