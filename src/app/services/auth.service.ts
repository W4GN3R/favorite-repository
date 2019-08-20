import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Token } from "@interfaces/token";
import { environment } from "@environments/environment";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private currentTokenSubject: BehaviorSubject<Token>;
  public currentToken: Observable<Token>;

  constructor(private http: HttpClient) {
    this.currentTokenSubject = new BehaviorSubject<Token>(
      JSON.parse(localStorage.getItem("currentToken"))
    );
    this.currentToken = this.currentTokenSubject.asObservable();
  }

  public get currentTokenValue(): Token {
    return this.currentTokenSubject.value;
  }

  getToken(code: string) {
    return this.http
      .post<any>(
        `${environment.api_host}/login/oauth/access_token`,
        {
          code,
          client_id: environment.client_id,
          client_secret: environment.client_secret
        },
        {
          headers: {
            Accept: "application/json"
          }
        }
      )
      .pipe(
        map(token => {
          /* istanbul ignore else */
          if (token && token.access_token) {
            localStorage.setItem("currentToken", JSON.stringify(token));
            this.currentTokenSubject.next(token);
          }

          return token;
        })
      );
  }

  logout() {
    localStorage.removeItem("currentToken");
    this.currentTokenSubject.next(null);
  }
}
