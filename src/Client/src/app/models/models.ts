// tennis-court.model.ts

export interface Booking {
  bookingId: number;
  userId: number;
  startTime: string;
  endTime: string;
  date: string;
}

export interface Availability {
  [day: string]: string[];
}

export interface TennisCourt {
  courtId: number;
  courtName: string;
  availability: Availability;
  bookedSlots: Booking[];
}
