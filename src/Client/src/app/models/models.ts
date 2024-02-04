export interface Booking {
  bookingId: string;
  userId: string;
  startTime: string;
  endTime: string;
  date: string;
}

export interface Availability {
  [day: string]: Date[];
}
export interface AvailabilityViewModel  {
  epochTimestampInSeconds: number
  timeInString: string}

export interface TennisCourt {
  courtId: string;
  courtName: string;
  availability: Availability;
  bookedSlots?: Booking[];
}
