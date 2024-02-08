import { AutoMap } from "@automapper/classes";

export class BookingViewModel {
	@AutoMap()
	bookingId: string;
	@AutoMap()
	userId: string;
	@AutoMap()
	startTime: string;
	@AutoMap()
	endTime: string;
	@AutoMap()
	date: string;
}

export class AvailabilityViewModel {
	[day: string]: Date[];
}

export class TennisCourtViewModel {
	@AutoMap()
	courtId: string;
	@AutoMap()
	courtName: string;
	@AutoMap()
	availability?: AvailabilityViewModel;
	@AutoMap()
	bookedSlots?: BookingViewModel[];
}
