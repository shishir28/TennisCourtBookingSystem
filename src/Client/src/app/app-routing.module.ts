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
        path: "tennis-courts",
        loadChildren: () =>
          import("./tennis-courts/tennis-courts.module").then(
            (m) => m.TennisCourtsModule
          ),
        pathMatch: "full",
      },
      {
        path: "tennis-courts",
        loadChildren: () =>
          import("./tennis-courts/tennis-courts.module").then(
            (m) => m.TennisCourtsModule
          ),
      },
      {
        path: "stripe-checkout",
        loadChildren: () =>
          import("./stripe-checkout/stripe-checkout.module").then(
            (m) => m.StripeCheckoutModule
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
