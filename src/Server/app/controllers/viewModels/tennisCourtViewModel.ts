import { AutoMap } from "@automapper/classes";

export class BookingViewModel {
	@AutoMap()
	id: string;
	@AutoMap()
	courtId: string;
	@AutoMap()
	userId: string;
	@AutoMap()
	startTime: string;
	@AutoMap()
	endTime: string;
	@AutoMap()
	date: Date;
}
export class CompositeDateViewModel {
	@AutoMap()
	dateValue: Date;
	@AutoMap()
	availabilityStatus: string;
}

export class AvailabilityViewModel {
	[day: string]: CompositeDateViewModel[];
}

export class TennisCourtViewModel {
	@AutoMap()
	id: string;
	@AutoMap()
	courtName: string;
	@AutoMap()
	availability?: AvailabilityViewModel;
	@AutoMap()
	bookedSlots?: BookingViewModel[];
}
