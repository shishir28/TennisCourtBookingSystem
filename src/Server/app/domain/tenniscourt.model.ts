import { AutoMap } from "@automapper/classes";

export class Booking {
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

export class Availability {
	[day: string]: Date[];
}

export class TennisCourt {
	@AutoMap()
	courtId: string;

	@AutoMap()
	courtName: string;

	@AutoMap()
	availability?: Availability;

	@AutoMap()
	bookedSlots?: Booking[];
}
