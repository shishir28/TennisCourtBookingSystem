import {
	Mapper,
	createMap,
	createMapper,
	forMember,
	mapFrom,
} from "@automapper/core";
import { classes } from "@automapper/classes";
import {
	AvailabilityViewModel,
	BookingViewModel,
	TennisCourtViewModel,
} from "../controllers/viewModels/tennisCourtViewModel";
import {
	Availability,
	Booking,
	TennisCourt,
} from "../domain/tenniscourt.model";

export class AutoMapperBootStrapper {
	mapper: Mapper;

	constructor() {
		this.mapper = createMapper({
			strategyInitializer: classes(),
		});
	}

	public bootstrap() {
		createMap(this.mapper, Booking, BookingViewModel);
		createMap(this.mapper, BookingViewModel, Booking);

		createMap(this.mapper, Availability, AvailabilityViewModel);
		createMap(this.mapper, AvailabilityViewModel, Availability);

		createMap(
			this.mapper,
			TennisCourt,
			TennisCourtViewModel,
			forMember(
				(destination) => destination.availability,
				mapFrom((source) => source.availability)
			)
		);

		createMap(
			this.mapper,
			TennisCourtViewModel,
			TennisCourt,
			forMember(
				(destination) => destination.availability,
				mapFrom((source) => source.availability)
			)
		);

		return this.mapper;
	}
}
