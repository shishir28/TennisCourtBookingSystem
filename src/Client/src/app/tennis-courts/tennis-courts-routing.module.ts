import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TennisCourtListComponent } from "./tennis-court-list.component";

const routes: Routes = [
  {
    path: "",
    component: TennisCourtListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TennisCourtsRoutingModule {}
