import { CommonModule, NgForOf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TennisCourtService } from './tennis-court.service';
import { TennisCourt } from '../models/models';
import { Subscription } from 'rxjs';
import { TennisCourtComponent } from '../tennis-court/tennis-court.component';
import { MatList, MatListItem } from '@angular/material/list';
@Component({
  selector: 'app-tennis-court-list',
  standalone: true,
  templateUrl: './tennis-court-list.component.html',
  styleUrl: './tennis-court-list.component.css',
  imports: [CommonModule, NgForOf, TennisCourtComponent, MatList, MatListItem],
})
export class TennisCourtListComponent implements OnInit, OnDestroy {
  tennisCourts: TennisCourt[] = [];
  sub!: Subscription;
  constructor(private tennisCourtService: TennisCourtService) {}

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    this.sub = this.tennisCourtService.getTennisCourts().subscribe((data) => {
      this.tennisCourts = data;
    });
  }
}
