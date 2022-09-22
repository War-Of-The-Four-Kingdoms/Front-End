import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
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

  getRole() {
    return this.http.get(this.apiUrl + '/getRole', this.options);
  }

  getCharacter() {
    return this.http.get(this.apiUrl + '/getCharacter', this.options);
  }

}
