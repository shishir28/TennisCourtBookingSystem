import { CommonModule, NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { MatProgressSpinner } from "@angular/material/progress-spinner";

export interface StripeCheckoutViewModel {}
@Component({
  selector: "app-stripe-checkout",
  templateUrl: "./stripe-checkout.component.html",
  styleUrls: ["./stripe-checkout.component.scss"],
})
export class StripeCheckoutComponent {
  message: string = "waiting for stripe checkout to complete";
  waiting: boolean = true;
}
