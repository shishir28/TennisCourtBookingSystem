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
  isBlocked: Boolean;
}

export interface Availability {
  [day: string]: CompositeDate[];
}

export interface AvailabilityViewModel {
  epochTimestampInSeconds: number;
  timeInString: string;
  isBlocked: Boolean;
}

export interface TennisCourt {
  id: string;
  courtName: string;
  availability: Availability;
  bookedSlots?: Booking[];
}
