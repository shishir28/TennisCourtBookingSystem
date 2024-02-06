import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { StripeCheckoutComponent } from './stripe-checkout/stripe-checkout.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'stripe-checkout', component: StripeCheckoutComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
