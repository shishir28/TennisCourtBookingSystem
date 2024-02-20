import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { LayoutComponent } from "./layout/layout.component";
import { AuthenticationModule } from "./authentication/authentication.module";
import { AuthGuard } from "./shared/guards/auth.guard";

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
        path: "tennis-courts",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("./tennis-courts/tennis-courts.module").then(
            (m) => m.TennisCourtsModule
          ),
        pathMatch: "full",
      },

      {
        path: "stripe-checkout",
        loadChildren: () =>
          import("./stripe-checkout/stripe-checkout.module").then(
            (m) => m.StripeCheckoutModule
          ),
      },
      {
        path: "",
        loadChildren: () =>
          import("./shared/shared-components.module").then(
            (m) => m.SharedComponentsModule
          ),
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
