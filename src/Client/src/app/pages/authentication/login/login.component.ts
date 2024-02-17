import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { fadeInUpAnimation } from "../../../../@fury/animations/fade-in-up.animation";
import { AuthenticationService } from "src/app/pages/authentication/authentication.service";

@Component({
  selector: "fury-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  animations: [fadeInUpAnimation],
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;

  inputType = "password";
  visible = false;
  loading!: boolean;

  constructor(
    private router: Router,
    private fb: UntypedFormBuilder,
    private cd: ChangeDetectorRef,
    private snackbar: MatSnackBar,
    public authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: new UntypedFormControl("", [
        Validators.required,
        Validators.email,
      ]),
      password: new UntypedFormControl("", [Validators.required]),
    });
  }

  login() {
    this.router.navigate(["/"]);
    this.authenticationService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        (result) => {
          this.loading = false;
          debugger;
          this.router.navigate(["/apps/calendar"]);
        },
        (error) => {
          this.loading = false;
          console.log(error);
        }
      );
  }
}
