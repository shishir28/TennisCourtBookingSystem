import { Component } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

export interface StripeCheckoutViewModel {}
@Component({
  selector: 'app-stripe-checkout',
  standalone: true,
  imports: [MatProgressSpinner],
  templateUrl: './stripe-checkout.component.html',
  styleUrl: './stripe-checkout.component.css',
})
export class StripeCheckoutComponent {
  message: string = 'waiting for stripe checkout to complete';
  waiting: boolean = true;
}
