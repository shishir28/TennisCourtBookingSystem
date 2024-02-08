import { TennisCourtRepository } from "../persistence/tenniscourt.repository";
import { logger } from "../infrastructure/logger";
import { Availability, TennisCourt } from "../domain/tenniscourt.model";

export class TennisCourtService {
	private tennisCourtRepository: TennisCourtRepository;
	constructor() {
		this.tennisCourtRepository = new TennisCourtRepository();
	}

	async getAllTennisCourts(): Promise<TennisCourt[]> {
		let promise = new Promise<TennisCourt[]>(
			async (resolve: Function, reject: Function) => {
				try {
					let tennisCourts =
						await this.tennisCourtRepository.ListAllTennisCourts();

					tennisCourts = tennisCourts
						.map((tc) => {
							tc.availability = this.getAvailabilityForWeek();
							return tc;
						})
						.sort((a, b) => a.courtId.localeCompare(b.courtId));
					resolve(tennisCourts);
				} catch (error) {
					logger.error(error.message);
					reject(error);
				}
			}
		);
		return promise;
	}
	// It should be handled by view model class, not here. It can be done in future.
	private getAvailabilityForWeek(): Availability {
		const availability: Availability = {};
		const weekDays = this.getOneWeekDaysFromToday();
		for (const day of weekDays) {
			const dayName = day.toLocaleDateString("en-US", { weekday: "long" });
			availability[dayName] = this.getDaySlots(day);
		}
		return availability;
	}

	private getOneWeekDaysFromToday(): Date[] {
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

	private getDaySlots(day: Date): Date[] {
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
