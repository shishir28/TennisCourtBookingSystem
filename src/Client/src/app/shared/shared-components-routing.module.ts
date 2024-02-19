import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NotFoundComponent } from "./not-found/not-found.component";
import { InternalServerErrorComponent } from "./internal-server-error/internal-server-error.component";
import { AccessDeniedComponent } from "./access-denied/access-denied.component";

const routes: Routes = [
  {
    path: "notfound",
    component: NotFoundComponent,
  },
  {
    path: "accessdenied",
    component: AccessDeniedComponent,
  },
  {
    path: "internalservererror",
    component: InternalServerErrorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharedRoutingModule {}
