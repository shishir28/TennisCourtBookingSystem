import { CommonModule, NgForOf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TennisCourt, AvailabilityViewModel } from '../models/models';
import {
  MatCard,
  MatCardHeader,
  MatCardContent,
  MatCardTitle,
  MatCardSubtitle,
} from '@angular/material/card';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatDivider } from '@angular/material/divider';
import { MatList, MatListItem } from '@angular/material/list';
@Component({
  selector: 'app-tennis-court',
  standalone: true,
  imports: [
    CommonModule,
    NgForOf,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    MatCardSubtitle,
    MatGridList,
    MatGridTile,
    MatDivider,
    MatList,
    MatListItem,
  ],
  templateUrl: './tennis-court.component.html',
  styleUrl: './tennis-court.component.css',
})
export class TennisCourtComponent {
  @Input()
  court!: TennisCourt;

  getDaysAndSlots(): { key: string; values: AvailabilityViewModel[] }[] {
    return Object.keys(this.court.availability).map((key) => ({
      key,
      values: this.court.availability[key].map((x) =>
        this.transformDate(new Date(x))
      ),
    }));
  }

  transformDate(dateValue: Date): AvailabilityViewModel {
    const epochTimestampInSeconds = Math.floor(dateValue.getTime() / 1000);
    // Get hours and minutes
    const hours = dateValue.getHours();
    const minutes = dateValue.getMinutes();
    const timeInString = `${hours < 10 ? '0' + hours : hours}:${
      minutes < 10 ? '0' + minutes : minutes
    }`;
    return {
      epochTimestampInSeconds: epochTimestampInSeconds,
      timeInString: timeInString,
    };
  }

  tileClicked(courtId: string, hourSlot: number): void {
    alert(` Tile ${courtId}  ${hourSlot} clicked!`);
    // we need to determine and send respective details to strip for booking
  }
}
