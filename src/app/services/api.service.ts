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


  drawCard(code: any,num: any) {
    let params = new HttpParams().set('room_code', code).set('num',num);
    return this.http.get(this.apiUrl + '/drawCard',{ params: params });
  }

  dropCard(code: any,cards: any) {
    return this.http.put(this.apiUrl + '/dropCard',{ roomcode: code,cards: cards });
  }

  openCard(code: any) {
    let params = new HttpParams().set('room_code', code);
    return this.http.get(this.apiUrl + '/openCard',{ params: params });
  }

  updateInUse(code: any,cards: any) {
    return this.http.put(this.apiUrl + '/updateCardInUse',{ roomcode: code,cards: cards });
  }

  getTopCards(code: any,num: any) {
    let params = new HttpParams().set('room_code', code).set('num',num);
    return this.http.get(this.apiUrl + '/getTop',{ params: params });
  }

  //neworder: [155,125,140] , drop: [177,156] , card_num: 5 , room_code: 'asfasf'
  setNewOrder(code: any,neworder: any,drop: any,num: any) {
    return this.http.put(this.apiUrl + '/setNewOrder',{ roomcode: code, card_num: num, neworder: neworder, drop: drop });
  }





}
