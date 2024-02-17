import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { AuthenticationService } from "./authentication.service";
import { MaterialModule } from "../../../@fury/shared/material-components.module";
import { LoginRoutingModule } from "./login/login-routing.module";
import { LoginComponent } from "./login/login.component";


@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  declarations: [LoginComponent],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
