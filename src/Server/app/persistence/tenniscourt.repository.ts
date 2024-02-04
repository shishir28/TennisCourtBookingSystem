import { TennisCourt, Availability } from "../domain/tenniscourt.model";
import { DBContext } from "./DBContext";

export class TennisCourtRepository {
	private dbContext: DBContext;

	constructor() {
		this.dbContext = new DBContext();
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
				courtId: rawData.id,
				courtName: rawData.name,
				availability: this.getAvailabilityForWeek(),
			});
		});
		return data.sort((a, b) => a.courtId.localeCompare(b.courtId));
	}

	// It should be handled by view model class . not here . Can be done in future
	getAvailabilityForWeek(): Availability {
		const availability: Availability = {};
		const weekDays = this.getOneWeekDaysFromToday();
		for (const day of weekDays) {
			const dayName = day.toLocaleDateString("en-US", { weekday: "long" });
			availability[dayName] = this.getDaySlots(day);
		}
		return availability;
	}

	getOneWeekDaysFromToday(): Date[] {
		const today = new Date();
		const next7Days: Date[] = [];
		next7Days.push(today);
		for (let i = 1; i <= 6; i++) {
			const nextDay = new Date(today);
			nextDay.setDate(today.getDate() + i);
			next7Days.push(nextDay);
		}
		return next7Days;
	}

	getDaySlots(day: Date): Date[] {
		let slots: Date[] = [];
		for (let hourOfTheDay = 6; hourOfTheDay < 22; hourOfTheDay++) {
			slots.push(
				new Date(
					day.getFullYear(),
					day.getMonth(),
					day.getDate(),
					hourOfTheDay,
					0,
					0
				)
			);
		}
		return slots;
	}
}
