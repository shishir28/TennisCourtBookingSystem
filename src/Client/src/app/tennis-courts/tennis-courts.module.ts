import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { TennisCourtService } from "./tennis-court.service";
import { MaterialModule } from "../../@fury/shared/material-components.module";
import { TennisCourtListComponent } from "./tennis-court-list.component";
import { TennisCourtComponent } from "./tennis-court.component";
import { BookingSlotComponent } from "./booking-slot/booking-slot.component";
import { TennisCourtsRoutingModule } from "./tennis-courts-routing.module";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    TennisCourtsRoutingModule,
  ],
  declarations: [
    TennisCourtListComponent,
    TennisCourtComponent,
    BookingSlotComponent,
  ],
  providers: [TennisCourtService],
})
export class TennisCourtsModule {}
