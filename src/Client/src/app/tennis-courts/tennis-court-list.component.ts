import { Component, OnDestroy, OnInit } from "@angular/core";
import { TennisCourtService } from "./tennis-court.service";
import { TennisCourt } from "../models/tennisCourt.model";
import { Subscription } from "rxjs";

@Component({
  selector: "app-tennis-court-list",
  templateUrl: "./tennis-court-list.component.html",
  styleUrls: ["./tennis-court-list.component.scss"],
})
export class TennisCourtListComponent implements OnInit, OnDestroy {
  tennisCourts: TennisCourt[] = [];
  sub!: Subscription;
  constructor(private tennisCourtService: TennisCourtService) {}

  ngOnDestroy(): void {}
  ngOnInit(): void {
    this.sub = this.tennisCourtService.getTennisCourts().subscribe((data) => {
      this.tennisCourts = data;
    });
  }
}
