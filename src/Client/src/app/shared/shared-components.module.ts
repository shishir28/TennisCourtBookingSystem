import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../../@fury/shared/material-components.module";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import {
  RequestInterceptorService,
  RequestInterceptorServiceFactoryProvider,
} from "./requestInterceptor.service";
import { InternalServerErrorComponent } from "./internal-server-error/internal-server-error.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { SharedRoutingModule } from "./shared-components-routing.module";
import { AccessDeniedComponent } from "./access-denied/access-denied.component";
const RequestInterceptorServiceExistingProvider = {
  provide: HTTP_INTERCEPTORS,
  useExisting: RequestInterceptorService,
  multi: true,
};

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedRoutingModule,
  ],
  declarations: [
    InternalServerErrorComponent,
    NotFoundComponent,
    AccessDeniedComponent,
  ],
  providers: [
    RequestInterceptorServiceExistingProvider,
    RequestInterceptorServiceFactoryProvider,
  ],
})
export class SharedComponentsModule {}
