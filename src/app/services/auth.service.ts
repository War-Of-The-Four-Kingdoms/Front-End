import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUrl = 'http://localhost:8000/api';
  apiUrl = 'http://localhost:8000/api';
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
    return this.http.post(this.authUrl + '/login', {
      email: e,
      password: p,
    }, this.options);
  }

  detail() {
    console.log(localStorage.getItem('access_token'));
    
    return this.http.post(this.apiUrl + '/details', "", { headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token')), })
  }

  refresh() {
    return this.http.post(this.apiUrl + '/refresh', { refresh_token: localStorage.getItem('refresh_token') }, this.options)
  }

  logout() {
    return this.http.get(this.apiUrl + '/revoke', { headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token')), })
  }
}
