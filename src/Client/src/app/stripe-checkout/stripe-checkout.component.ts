import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
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
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const paramValue = params["purchaseResult"];
      const auth = this.authenticationService.getAuthObject();
      auth.onAuthStateChanged((user) => {
        if (!!user) {
          if (paramValue == "success") {
            alert("payment successful");
          } else {
            alert("payment failed");
          }
          this.router.navigate(["/tennis-courts"]);
        }
      });
    });
  }
}
