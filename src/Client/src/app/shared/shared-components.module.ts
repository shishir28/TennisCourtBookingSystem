import { CommonModule } from "@angular/common";
import { MaterialModule } from "../../@fury/shared/material-components.module";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injector, NgModule } from "@angular/core";
import { Router } from "@angular/router";
import { RequestInterceptorService } from "./requestInterceptor.service";
import { AccessDeniedComponent } from "./access-denied/access-denied.component";
import { InternalServerErrorComponent } from "./internal-server-error/internal-server-error.component";
import { NotFoundComponent } from "./not-found/not-found.component";

const InterceptorServiceExistingProvider = {
  provide: HTTP_INTERCEPTORS,
  useExisting: RequestInterceptorService,
  multi: true,
};

export function InterceptorServiceFactory(injector: Injector) {
  return new RequestInterceptorService(injector);
}

export let InterceptorServiceFactoryProvider = {
  provide: RequestInterceptorService,
  useFactory: InterceptorServiceFactory,
  deps: [Router],
};

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [
    AccessDeniedComponent,
    InternalServerErrorComponent,
    NotFoundComponent,
  ],
  providers: [
    InterceptorServiceExistingProvider,
    InterceptorServiceFactoryProvider,
  ],
})
export class SharedComponentsModule {}
