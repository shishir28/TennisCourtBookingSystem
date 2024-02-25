export interface Booking {
  id: string;
  courtId: string;
  userId: string;
  startTime: string;
  endTime: string;
  date: string;
  status: string;
}
export interface CompositeDate {
  dateValue: Date;
  availabilityStatus: string;
}

export interface Availability {
  [day: string]: CompositeDate[];
}

export interface AvailabilityViewModel {
  epochTimestampInSeconds: number;
  timeInString: string;
  availabilityStatus: string;
}

export interface TennisCourt {
  id: string;
  courtName: string;
  availability: Availability;
  bookedSlots?: Booking[];
}
