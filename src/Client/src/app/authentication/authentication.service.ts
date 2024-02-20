import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { FirebaseApp } from "@angular/fire/app";
import {
  Auth,
  Unsubscribe,
  getAuth,
  signInWithEmailAndPassword,
} from "@angular/fire/auth";
import { from } from "rxjs";
import { Router } from "@angular/router";
export class SignUpResponse {
  userId!: string;
  email!: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  constructor(
    private httpClient: HttpClient,
    private ofApp: FirebaseApp,
    private router: Router
  ) {}

  login(email: string, password: string): Observable<Unsubscribe> {
    const auth = getAuth(this.ofApp);
    let result = signInWithEmailAndPassword(auth, email, password).then((_) => {
      var changedState = auth.onAuthStateChanged((user) => {
        const token = user!
          .getIdToken()
          .then((token) => {
            localStorage.setItem("current-user-token", token);
            localStorage.setItem("current-user-id", user.uid);
            return token;
          })
          .catch((error) => {
            console.log(error);
          });
        return token;
      });
      return changedState;
    });
    return from(result);
  }

  signup(email: string, password: string): Observable<SignUpResponse> {
    return this.httpClient.post<SignUpResponse>(
      environment.api.baseUrl + "/api/signup",
      {
        email,
        password,
      }
    );
  }

  logout(): Observable<void> {
    const auth = getAuth(this.ofApp);
    if (localStorage.getItem("current-user-token")) {
      localStorage.removeItem("current-user-token");
    }
    return from(auth.signOut());
  }

  isAuthenticated(): boolean {
    const auth = getAuth(this.ofApp);
    return !!auth.currentUser;
  }

  getAuthObject(): Auth {
    return getAuth(this.ofApp);
  }
}
