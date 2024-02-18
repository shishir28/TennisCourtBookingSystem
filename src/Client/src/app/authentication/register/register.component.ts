import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { fadeInUpAnimation } from "../../../@fury/animations/fade-in-up.animation";
import { AuthenticationService } from "../authentication.service";

@Component({
  selector: "fury-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
  animations: [fadeInUpAnimation],
})
export class RegisterComponent implements OnInit {
  registerUserForm: UntypedFormGroup;
  loading!: boolean;
  inputType = "password";
  visible = false;

  constructor(
    private router: Router,
    private fb: UntypedFormBuilder,
    private cd: ChangeDetectorRef,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.registerUserForm = this.fb.group({
      email: new UntypedFormControl("", [
        Validators.required,
        Validators.email,
      ]),
      password: ["", Validators.required],
      passwordConfirm: ["", Validators.required],
    });
  }

  register() {
    this.loading = true;
    this.authenticationService
      .signup(
        this.registerUserForm.value.email,
        this.registerUserForm.value.password
      )
      // .signup('shishir28@live.com', 'theponds123#')
      .subscribe(
        (_) => {
          this.loading = false;
          this.router.navigate(["/login"]);
        },
        (error) => {
          this.loading = false;
          console.log(error);
        }
      );
  }
}
