import { Component, Input } from "@angular/core";
import { AvailabilityViewModel } from "../../models/tennisCourt.model";
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
    // shade of red(#f44336) and shade of green(#009688)
    return this.availability.isBlocked ? "#f44336" : "#009688";
  }
}
