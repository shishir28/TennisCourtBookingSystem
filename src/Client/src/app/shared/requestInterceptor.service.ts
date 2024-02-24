import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from "@angular/common/http";
import { Observable } from "rxjs";
import * as rxjs from "rxjs";
import { catchError, finalize, map } from "rxjs/operators";
import { Router } from "@angular/router";

declare var $: any;

@Injectable()
export class RequestInterceptorService implements HttpInterceptor {
  public pendingRequests: number = 0;
  public showLoading: boolean = false;
  private _filteredUrlPatterns: RegExp[] = [];
  private numberOfAttempts: number;

  constructor(private router: Router) {
    this.numberOfAttempts = 3;
  }

  addCustomHeaders(req: HttpRequest<any>, token: string): HttpRequest<any> {
    const customHeaders: { [key: string]: string } = {};
    customHeaders["Content-Type"] = "application/json";
    customHeaders["If-Modified-Since"] = "Sun, 01 Jan 2024 00:00:00 GMT";
    customHeaders["Cache-Control"] = "no-store, no-cache";
    customHeaders["Pragma"] = "no-cache Expires: 0";
    if (!!localStorage.getItem("current-user-token")) {
      customHeaders["Authorization"] =
        "Bearer " + localStorage.getItem("current-user-token");
    }
    let request = req.clone({
      setHeaders: customHeaders,
    });
    return request;
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const modifiedRequest = this.addCustomHeaders(request, "myToken");

    // Continue with the modified request
    return next.handle(modifiedRequest).pipe(
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
      window.location.href = locationPath + "notfound";
      return rxjs.EMPTY;
    } else if (err.status === 401 || err.status === 403) {
      window.location.href = locationPath + "accessdenied";
      return rxjs.EMPTY;
    } else if (err.status === 410) {
      sessionStorage.clear;
      window.location.href = locationPath + "login";
      return rxjs.EMPTY;
    } else if (err.status >= 500) {
      window.location.href = locationPath + "internalservererror";
      return rxjs.EMPTY;
    } else {
      return rxjs.throwError(err);
    }
  }
}

export function RequestInterceptorServiceFactory(router: Router) {
  return new RequestInterceptorService(router);
}

export const RequestInterceptorServiceFactoryProvider = {
  provide: RequestInterceptorService,
  useFactory: RequestInterceptorServiceFactory,
  deps: [Router],
};
