import { Component, ElementRef, OnInit } from '@angular/core';
import { WebSocketService } from "../../web-socket.service";
import {
  Router
} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isVisibleMiddle = false;
  array = [1, 2, 3, 4];
  numbers = [5,6,7,8,9,10];
  num:any = 5
  switchValue = false;
  constructor(private router: Router, private socket: WebSocketService, private elementRef: ElementRef) { }
  roomsarray: any
  inputCode: string = '';
  isVisible = true;
  ngOnInit(): void {
    this.socket.emit('list room', {});
    this.socket.listen('set room list').subscribe((rooms: any) => {
      console.log(rooms)
      this.roomsarray = rooms
    });
  }
  createLobby(): void {
    let code = Math.random().toString(36).slice(2, 8).toUpperCase();
    this.socket.emit('create lobby', { code: code, max_player: 10, private: false });
    this.router.navigate(['lobby']);
  }

  setCode(event: any): void {
    this.inputCode = event.target.value;
  }

  joinLobby(): void {
    this.socket.emit('join lobby', { code: this.inputCode, max_player: 10 });
    this.router.navigate(['lobby']);
  }

  joinLobbys(data:any): void {
    this.socket.emit('join lobby', { code: data });
    this.router.navigate(['lobby']);
  }

  handleOkMiddle(): void {
    let code = Math.random().toString(36).slice(2, 8).toUpperCase();
    this.socket.emit('create lobby', { code: code, max_player: this.num, private: this.switchValue });
    this.router.navigate(['lobby']);
    this.isVisibleMiddle = false;
  }

  handleCancelMiddle(): void {
    this.isVisibleMiddle = false;
  }

  showModalMiddle(): void {
    this.isVisibleMiddle = true;
  }

  // var user = [];
  // $(function () {
  //   $('#usernameModal').show();
  //   let ip_address = '127.0.0.1';
  //   let socket_port = '3000';
  //   let socket = io(ip_address + ':' + socket_port);

  //   $('#setUsername').on('click', function () {
  //     $('#usernameModal').hide();
  //     user[username] = $('#username').val();
  //     $('#username_show').val('Username: ' + user[username]);
  //     socket.emit('start', user[username]);
  //   });

  //   $('#createLobby').on('click', function () {
  //     // let code = Math.random().toString(36).slice(2,8).toUpperCase();
  //     // socket.emit('create lobby', code , 10);
  //     console.log('work');
  //     Router.navigate('lobby');
  //   });

  //   $('#joinLobby').on('click', function (e) {

  //   });

  // });

}
