import { Component, Input } from "@angular/core";
import { AvailabilityViewModel } from "../../models/tennisCourt.model";
import { MatGridList, MatGridTile } from "@angular/material/grid-list";
import { CheckoutService } from "../../stripe-checkout/checkout.service";
@Component({
  selector: "app-booking-slot",
  templateUrl: "./booking-slot.component.html",
  styleUrls: ["./booking-slot.component.scss"],
})
export class BookingSlotComponent {
  @Input()
  availability!: AvailabilityViewModel;
  @Input()
  courtId!: string;
  bookingStarted: boolean = false;

  constructor(private checkoutService: CheckoutService) {}

  bookTheCourt(): void {
    this.bookingStarted = true;
    const epochTimestampInSeconds: string = `${this.availability.epochTimestampInSeconds}`;
    this.checkoutService
      .startCheckout(this.courtId, epochTimestampInSeconds)
      .subscribe(
        (checkoutResponse) => {
          console.log(checkoutResponse);
          this.checkoutService.redirectToCheckout(checkoutResponse);
        },
        (error) => {
          console.log(error);
        },
        () => {
          this.bookingStarted = false;
          console.log("completed");
        }
      );
  }

  getBackgroundColor(): string {
    return this.bookingStarted ? "red" : "green";
  }
}
