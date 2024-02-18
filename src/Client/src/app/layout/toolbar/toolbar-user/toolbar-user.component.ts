import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/authentication/authentication.service";

@Component({
  selector: "fury-toolbar-user",
  templateUrl: "./toolbar-user.component.html",
  styleUrls: ["./toolbar-user.component.scss"],
})
export class ToolbarUserComponent implements OnInit {
  isOpen: boolean;

  constructor(
    private router: Router,
    public authenticationService: AuthenticationService
  ) {}

  ngOnInit() {}

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  onClickOutside() {
    this.isOpen = false;
  }

  logout() {
    this.authenticationService.logout().subscribe((_) => {
      this.router.navigate(["/login"]);
    });
  }
}
