import { Booking } from "../domain/tenniscourt.model";
import { DBContext } from "./DBContext";

export class BookingRepository {
	private dbContext: DBContext;

	constructor() {
		this.dbContext = DBContext.getInstance();
	}

	async Insert(model: Booking): Promise<Booking> {
		const collectionName: string = "bookings";
		const documentReference = await this.dbContext.db
			.collection(collectionName)
			.add(model);
		const newId = documentReference.id;
		model.id = newId;
		return model;
	}

	// async Update(identifier: string, model: Booking): Promise<Boolean> {
	// 	const collectionName: string = "bookings";
	// 	const documentReference  = this.dbContext.db
	// 		.collection(collectionName)
	// 		.doc(identifier)
	// 		.update(model);

	// 	return this._model
	// 		.update(model.dataValues, { where: { id: identifier } })
	// 		.then((results: [number, Array[T]]) => {
	// 			if (results.length > 0) {
	// 				logger.info(`Updated model with id ${identifier}.`);
	// 			} else {
	// 				logger.info(`Updated model with id ${identifier} does not exist.`);
	// 			}
	// 			return results.length > 0;
	// 		});
	// }
}
