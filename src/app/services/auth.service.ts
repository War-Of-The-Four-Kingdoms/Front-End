import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiURL;
  options: any;

  constructor(
    private http: HttpClient

  ) {
    this.options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    };
  }

  login(e: string, p: string) {
    return this.http.post(this.apiUrl + '/login', {
      email: e,
      password: p,
    }, this.options);
  }

  register(n: string, e: string,p:string,cp:string){
    return this.http.post(this.apiUrl + '/register', {
      name: n,
      email: e,
      password:p,
      c_password:cp
    }, this.options);
  }

  detail() {
    return this.http.get(this.apiUrl + '/details', { headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token')), })
  }

  refresh() {
    return this.http.post(this.apiUrl + '/refresh', { refresh_token: localStorage.getItem('refresh_token') }, this.options)
  }

  logout() {
    return this.http.get(this.apiUrl + '/revoke', { headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token')), })
  }
}
