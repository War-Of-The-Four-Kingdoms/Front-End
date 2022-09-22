import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  getRole(num: any) {
    let params = new HttpParams().set('player_num', num);
    return this.http.get(this.apiUrl + '/getRole', { params: params });
  }

  getCharacter() {
    return this.http.get(this.apiUrl + '/getCharacter');
  }

}
