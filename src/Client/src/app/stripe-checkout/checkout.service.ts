import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { CheckoutResponse } from "../models/stripe.model";

declare const Stripe: any;

@Injectable({
  providedIn: "root",
})
export class CheckoutService {
  constructor(private httpClient: HttpClient) {}

  startCheckout(
    courtId: string,
    epochTimestampInSeconds: string
  ): Observable<CheckoutResponse> {
    return this.httpClient.post<CheckoutResponse>(
      environment.api.baseUrl + "/api/checkout",
      {
        courtId,
        epochTimestampInSeconds,
        callbackUrl: this.buildCallbackUrl(),
      }
    );
  }

  buildCallbackUrl() {
    return `${window.location.protocol}//${window.location.host}/stripe-checkout`;
  }

  redirectToCheckout(checkoutResponse: CheckoutResponse): void {
    const stripe = Stripe(checkoutResponse.stripePublicKey);
    stripe.redirectToCheckout({
      sessionId: checkoutResponse.stripeCheckoutSessionId,
    });
  }
}
