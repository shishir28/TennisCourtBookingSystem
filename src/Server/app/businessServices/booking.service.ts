import { Booking } from "../domain/tenniscourt.model";
import { BookingRepository } from "../persistence/booking.repository";
import { CheckoutRequest } from "../domain/stripe.model";
import { v4 as uuidv4 } from "uuid";

export class BookingService {
	private bookingRepository: BookingRepository;
	constructor() {
		this.bookingRepository = new BookingRepository();
	}

	async createBooking(checkoutRequest: CheckoutRequest): Promise<Booking> {
		const bookingData = this.getBookingData(checkoutRequest);
		let promise = new Promise<Booking>(
			(resolve: Function, reject: Function) => {
				return this.bookingRepository
					.Insert(bookingData)
					.then((bookingInstance: Booking) => {
						resolve(bookingInstance);
					})
					.catch((error: Error) => {
						// logger.error(error.message);
						reject(error);
					});
			}
		);
		return promise;
	}

	async updateBooking(bookingId: string): Promise<Boolean> {
		let promise = new Promise<Boolean>(
			(resolve: Function, reject: Function) => {
				return this.bookingRepository
					.Update(bookingId)
					.then((bookingResponse: Boolean) => {
						resolve(bookingResponse);
					})
					.catch((error: Error) => {
						reject(error);
					});
			}
		);
		return promise;
	}

	private getBookingData(checkoutRequest: CheckoutRequest): Booking {
		const bookingTime = this.convertUnixEpochToDateTime(
			checkoutRequest.epochTimestampInSeconds
		);

		const endTime = new Date(bookingTime.getTime() + 1 * 60 * 60 * 1000);

		let bookingData: Booking = {
			userId: checkoutRequest.userId,
			courtId: checkoutRequest.courtId,
			id: uuidv4(),
			status: "InProgress",
			startTime: this.getHoursAndMinutes(bookingTime),
			endTime: this.getHoursAndMinutes(endTime),
			date: bookingTime,
		};
		return bookingData;
	}

	private getHoursAndMinutes(dateValue: Date) {
		const hours = dateValue.getHours();
		const minutes = dateValue.getMinutes();
		const timeInString = `${hours < 10 ? "0" + hours : hours}:${
			minutes < 10 ? "0" + minutes : minutes
		}`;
		return timeInString;
	}

	private convertUnixEpochToDateTime(unixEpochSeconds: number): Date {
		const unixEpochMilliseconds = unixEpochSeconds * 1000;
		return new Date(unixEpochMilliseconds);
	}
}
