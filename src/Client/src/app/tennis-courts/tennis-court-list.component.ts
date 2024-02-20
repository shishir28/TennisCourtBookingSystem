import { Component, OnDestroy, OnInit } from "@angular/core";
import { TennisCourtService } from "./tennis-court.service";
import { TennisCourt } from "../models/tennisCourt.model";
import { Subscription } from "rxjs";
import { AuthenticationService } from "../authentication/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-tennis-court-list",
  templateUrl: "./tennis-court-list.component.html",
  styleUrls: ["./tennis-court-list.component.scss"],
})
export class TennisCourtListComponent implements OnInit, OnDestroy {
  tennisCourts: TennisCourt[] = [];
  sub!: Subscription;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private tennisCourtService: TennisCourtService
  ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.sub = this.tennisCourtService.getTennisCourts().subscribe((data) => {
      this.tennisCourts = data;
    });
  }
}
