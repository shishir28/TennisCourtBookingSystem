import { Component, Input } from '@angular/core';
import { AvailabilityViewModel } from '../models/models';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
@Component({
  selector: 'app-booking-slot',
  standalone: true,
  imports: [MatGridList, MatGridTile],
  templateUrl: './booking-slot.component.html',
  styleUrl: './booking-slot.component.css',
})
export class BookingSlotComponent {
  @Input()
  availability!: AvailabilityViewModel;
  @Input()
  courtId!: string;
  bookingStarted: boolean = false;

  bookTheCourt(): void {
    this.bookingStarted = true;
    // alert(
    //   ` ${this.courtId} booking epoch${this.availability.epochTimestampInSeconds} clicked!`
    // );
  }

  getBackgroundColor(): string {
    return this.bookingStarted ? 'red' : 'green';
  }
}
