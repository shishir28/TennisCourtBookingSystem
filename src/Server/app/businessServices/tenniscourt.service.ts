import { TennisCourtRepository } from "../persistence/tenniscourt.repository";
import {
	Availability,
	Booking,
	CompositeDate,
	TennisCourt,
} from "../domain/tenniscourt.model";
import { logger } from "../infrastructure";
import { BookingRepository } from "../persistence/booking.repository";
import { Timestamp } from "firebase/firestore";

export class TennisCourtService {
	private tennisCourtRepository: TennisCourtRepository;
	private bookingRepository: BookingRepository;

	constructor() {
		this.tennisCourtRepository = new TennisCourtRepository();
		this.bookingRepository = new BookingRepository();
	}

	async getAllTennisCourtsAndAvailability(): Promise<TennisCourt[]> {
		let promise = new Promise<TennisCourt[]>(
			async (resolve: Function, reject: Function) => {
				try {
					let tennisCourts =
						await this.tennisCourtRepository.ListAllTennisCourts();
					for (const tennisCourt of tennisCourts) {
						tennisCourt.availability = await this.getAvailabilityForWeek(
							tennisCourt
						);
					}

					tennisCourts = tennisCourts.sort((a, b) =>
						a.courtName.localeCompare(b.courtName)
					);
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
	private async getAvailabilityForWeek(
		tennisCourt: TennisCourt
	): Promise<Availability> {
		const availability: Availability = {};
		const bookings = await this.getBookingsForWeek(tennisCourt.id);

		const weekDays = this.getOneWeekDaysFromToday();
		for (const day of weekDays) {
			const dayName = day.toLocaleDateString("en-US", { weekday: "long" });
			const dayBookings = this.getBookingsForTheDay(bookings, day);
			availability[dayName] = this.getDaySlots(day, dayBookings);
		}
		return availability;
	}
	private getBookingsForTheDay(bookings: Booking[], day: Date): Booking[] {
		const result = bookings?.filter(
			(b) => (b.date as any as Timestamp).toDate().getDay() === day.getDay()
		);
		return result;
	}

	private async getBookingsForWeek(courtId: string): Promise<Booking[]> {
		const beginDate = this.getDateFromTodayOnly(0);
		const endDate = this.getDateFromTodayOnly(6);

		let promise = new Promise<Booking[]>(
			(resolve: Function, reject: Function) => {
				return this.bookingRepository
					.GetBookings(courtId, beginDate, endDate)
					.then((bookingInstance: Booking[]) => {
						resolve(bookingInstance);
					})
					.catch((error: Error) => {
						reject(error);
					});
			}
		);
		return promise;
	}

	private getOneWeekDaysFromToday(): Date[] {
		const today = this.getDateFromTodayOnly(0);
		const next7Days: Date[] = [];

		next7Days.push(today);
		for (let i = 1; i <= 6; i++) {
			const nextDay = new Date(today);
			nextDay.setDate(today.getDate() + i);
			next7Days.push(nextDay);
		}
		return next7Days;
	}

	private getDateFromTodayOnly(dayToAdd: number): Date {
		let dateValue = new Date();
		dateValue.setHours(0, 0, 0, 0);
		dateValue.setDate(dateValue.getDate() + dayToAdd);
		return dateValue;
	}

	private getDaySlots(day: Date, dayBookings: Booking[]): CompositeDate[] {
		let slots: CompositeDate[] = [];
		for (let hourOfTheDay = 6; hourOfTheDay < 22; hourOfTheDay++) {
			const dateValue = new Date(
				day.getFullYear(),
				day.getMonth(),
				day.getDate(),
				hourOfTheDay,
				0,
				0
			);
			const result = dayBookings?.filter(
				(b) =>
					parseInt(b.startTime.split(":")[0]) === hourOfTheDay &&
					b.status === "Completed"
			);

			slots.push({
				dateValue,
				isBlocked: !!result && result.length > 0,
			});
		}
		return slots;
	}
}
