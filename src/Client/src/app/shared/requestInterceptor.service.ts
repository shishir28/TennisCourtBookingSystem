import { Injectable, Injector } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from "@angular/common/http";
import { Observable } from "rxjs";
import {
  EMPTY as observableEmpty,
  throwError as observableThrowError,
} from "rxjs";
import { AuthenticationService } from "../authentication/authentication.service";
import { catchError, finalize, map } from "rxjs/operators";

declare var $: any;

@Injectable()
export class RequestInterceptorService implements HttpInterceptor {
  public pendingRequests: number = 0;
  public showLoading: boolean = false;
  private numberOfAttempts: number;
  private _filteredUrlPatterns: RegExp[] = [];
  constructor(private injector: Injector) {
    this.numberOfAttempts = 3;
  }

  //   addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
  //       // return req.clone({ setHeaders: { Authorization: "Bearer " + token } });
  //       return req;
  //   }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authService = this.injector.get(AuthenticationService);
    // Continue with the modified request
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((err: any) => {
        return this.interceptErrors(err);
      }),
      finalize(() => {})
    );
  }

  private interceptErrors(err: any): Observable<HttpResponse<any>> {
    let locationPath = location.origin;
    let lastCharacter = locationPath.substr(locationPath.length - 1);
    if (lastCharacter != "/") {
      locationPath = locationPath + "/";
    }

    if (err.status === 404) {
      window.location.href = locationPath + "notFound";
      return observableEmpty;
    } else if (err.status === 401 || err.status === 403) {
      window.location.href = locationPath + "accessDenied";
      return observableEmpty;
    } else if (err.status === 410) {
      sessionStorage.clear;
      window.location.href = locationPath + "login";
      return observableEmpty;
    } else if (err.status >= 500) {
      window.location.href = locationPath + "internalServerError";
      return observableEmpty;
    } else {
      return observableThrowError(err);
    }
  }
}
