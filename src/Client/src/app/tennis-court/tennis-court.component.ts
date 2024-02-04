import { CommonModule, NgForOf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TennisCourt } from '../models/models';
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

  getDaysAndSlots(): { key: string; values: string[] }[] {
    return Object.keys(this.court.availability).map((key) => ({
      key,
      values: this.court.availability[key],
    }));
  }
  tileClicked(tileNumber: any): void {
    alert(`Tile ${tileNumber} clicked!`);
    // Add your custom logic here
  }
}
