import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../authentication/authentication.service";

export interface StripeCheckoutViewModel {}
@Component({
  selector: "app-stripe-checkout",
  templateUrl: "./stripe-checkout.component.html",
  styleUrls: ["./stripe-checkout.component.scss"],
})
export class StripeCheckoutComponent implements OnInit, OnDestroy {
  message: string = "waiting for stripe checkout to complete";
  waiting: boolean = true;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    const auth = this.authenticationService.getAuthObject();
    auth.onAuthStateChanged((user) => {
      if (!!user) {
        this.router.navigate(["/tennis-courts"]);
      }
    });
  }
}
