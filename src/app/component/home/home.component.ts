import { Validators } from '@angular/forms';
import { Component, ElementRef, OnInit } from '@angular/core';
import { WebSocketService } from "../../web-socket.service";
import {
  Router
} from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isVisibleMiddle = false;
  array = [1, 2, 3, 4];
  numbers = [5, 6, 7, 8, 9, 10];
  name: any
  email: any
  uuid: any
  num: any = 5
  switchValue = false;
  constructor(private router: Router, private socket: WebSocketService, private elementRef: ElementRef, private authService: AuthService) { }
  roomsarray: any
  inputCode: string = '';
  isVisible = true;
  ngOnInit(): void {
    this.socket.emit('list room', {});
    this.socket.listen('set room list').subscribe((rooms: any) => {

      this.roomsarray = rooms
    });
    this.getDetails();

    // let expireDate = new Date()
    // let timestamp = Math.floor(expireDate.getTime() / 1000);
    // let expired = localStorage.getItem('expires_in')
    // if (parseInt(String(expired)) <= parseInt(String(timestamp))) {
    //   this.authService.refresh().subscribe((res: any) => {
    //     let expireDate = new Date()
    //     let timestamp = Math.floor(expireDate.getTime() / 1000) + res.expires_in;
    //     localStorage.setItem('access_token', res.access_token);
    //     localStorage.setItem('refresh_token', res.refresh_token);
    //     localStorage.setItem('expires_in', timestamp)
    //     let a = this.getDetails();
    //   })
    // } else {
    //   let a = this.getDetails();

    // }
    this.socket.listen('user checked').subscribe((data: any) => {
      if(data.is_created) {
        console.log('do');

        this.router.navigate(['start' + '/' + data.code]);
      }else {
        console.log('not');
        alert("Your Name already Taken");
        setTimeout(function () {
          window.location.reload();
        }, 3000)
      }
    });

  }

  getDetails(): string {
    this.authService.detail()
        .subscribe((res: any) => {
          this.name = res.success.name
          this.email = res.success.email
          this.uuid = res.success.uuid
          this.socket.emit('start', {
            username: this.name,
            uuid: this.uuid,
          });
          if(sessionStorage.getItem('username') == null){
            sessionStorage.setItem('username',this.name);
            sessionStorage.setItem('uuid',this.uuid);
          }
          // this.socket.emit('start', { username: this.name, uuid: this.uuid })
    });
    return 'success';
  }
  createLobby(): void {
    let code = Math.random().toString(36).slice(2, 8).toUpperCase();
    this.socket.emit('create lobby', { code: code, max_player: 10, private: false });
  }

  setCode(event: any): void {
    this.inputCode = event.target.value;
  }

  joinLobby(): void {
    this.socket.emit('join lobby', { code: this.inputCode, max_player: 10 });
  }

  joinLobbys(data: any): void {
    this.socket.emit('join lobby', { code: data });
  }

  handleOkMiddle(): void {
    let code = Math.random().toString(36).slice(2, 8).toUpperCase();
    this.socket.emit('create lobby', { code: code, max_player: this.num, private: this.switchValue });
    this.isVisibleMiddle = false;
  }

  handleCancelMiddle(): void {
    this.isVisibleMiddle = false;
  }

  showModalMiddle(): void {
    this.isVisibleMiddle = true;
  }
}
