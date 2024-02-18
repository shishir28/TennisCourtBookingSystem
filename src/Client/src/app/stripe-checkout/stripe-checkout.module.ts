import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CheckoutService } from "./checkout.service";
import { MaterialModule } from "../../@fury/shared/material-components.module";
import { StripeCheckoutComponent } from "./stripe-checkout.component";
import { StripeCheckoutRoutingModule } from "./stripe-checkout.routing.module";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    StripeCheckoutRoutingModule,
  ],
  declarations: [StripeCheckoutComponent],
  providers: [CheckoutService],
})
export class StripeCheckoutModule {}
