import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { FirebaseApp } from "@angular/fire/app";
import {
  Unsubscribe,
  getAuth,
  signInWithEmailAndPassword,
} from "@angular/fire/auth";
import { from } from "rxjs";
export class SignUpResponse {
  userId!: string;
  email!: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  constructor(private httpClient: HttpClient, private ofApp: FirebaseApp) {}

  login(email: string, password: string): Observable<Unsubscribe> {
    const auth = getAuth(this.ofApp);
    let result = signInWithEmailAndPassword(auth, email, password).then((_) => {
      var changedState = auth.onAuthStateChanged((user) => {
        const token = user!
          .getIdToken()
          .then((token) => {
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

  logout() {}
}
