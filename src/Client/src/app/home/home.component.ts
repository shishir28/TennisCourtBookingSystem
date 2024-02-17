import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TennisCourtListComponent } from "../tennis-court-list/tennis-court-list.component";
@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [CommonModule, TennisCourtListComponent]
})
export class HomeComponent {}
