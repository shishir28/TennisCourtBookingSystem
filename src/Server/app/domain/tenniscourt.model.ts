import { AutoMap } from "@automapper/classes";

export class Booking {
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

	@AutoMap()
	status: string;
}
export class CompositeDate {
	@AutoMap()
	dateValue: Date;
	@AutoMap()
	availabilityStatus: string;
}

export class Availability {
	[day: string]: CompositeDate[];
}

export class TennisCourt {
	@AutoMap()
	id: string;

	@AutoMap()
	courtName: string;

	@AutoMap()
	availability?: Availability;

	@AutoMap()
	bookedSlots?: Booking[];
}
