import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiRepositoryService {


  // list() {
  //   return this.http.get<any[]>(`${this.Repository}`);
  // }

  constructor(private http: HttpClient) {}

  list(token: string) {
    return this.http.get<any>("https://api.github.com/user/repos", {
      params: { access_token: token }
    });
  }
}
