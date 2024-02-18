import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { LayoutComponent } from "./layout/layout.component";
import { AuthenticationModule } from "./authentication/authentication.module";

const routes: Routes = [
  {
    path: "login",
    loadChildren: () =>
      import("./authentication/authentication.module").then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: "register",
    loadChildren: () =>
      import("./authentication/register/register.module").then(
        (m) => m.RegisterModule
      ),
  },

  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "apps/calendar",
        loadChildren: () =>
          import("./pages/apps/calendar/calendar.module").then(
            (m) => m.CalendarAppModule
          ),
      },

      {
        path: "page-layouts",
        loadChildren: () =>
          import("./pages/page-layouts/page-layouts.module").then(
            (m) => m.PageLayoutsModule
          ),
      },

      {
        path: "blank",
        loadChildren: () =>
          import("./pages/blank/blank.module").then((m) => m.BlankModule),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: "enabledNonBlocking",
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: "enabled",
      anchorScrolling: "enabled",
    }),
  ],
  exports: [RouterModule, AuthenticationModule],
})
export class AppRoutingModule {}
