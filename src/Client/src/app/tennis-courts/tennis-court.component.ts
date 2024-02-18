import { Component, Input } from "@angular/core";
import {
  TennisCourt,
  AvailabilityViewModel,
} from "../models/tennisCourt.model";
@Component({
  selector: "app-tennis-court",
  templateUrl: "./tennis-court.component.html",
  styleUrls: ["./tennis-court.component.scss"],
})
export class TennisCourtComponent {
  @Input()
  court!: TennisCourt;

  getDaysAndSlots(): { key: string; values: AvailabilityViewModel[] }[] {
    let res = Object.keys(this.court.availability).map((key) => ({
      key,
      values: this.court.availability[key].map((x) =>
        this.transformDate(new Date(x))
      ),
    }));
    return res;
  }

  transformDate(dateValue: Date): AvailabilityViewModel {
    const epochTimestampInSeconds = Math.floor(dateValue.getTime() / 1000);
    // Get hours and minutes
    const hours = dateValue.getHours();
    const minutes = dateValue.getMinutes();
    const timeInString = `${hours < 10 ? "0" + hours : hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }`;
    return {
      epochTimestampInSeconds: epochTimestampInSeconds,
      timeInString: timeInString,
    };
  }
}
