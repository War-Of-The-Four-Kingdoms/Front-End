import { Validators } from '@angular/forms';
import { Component, ElementRef, OnInit } from '@angular/core';
import { WebSocketService } from "../../services/web-socket.service";
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
  numbers = [4, 5, 6];
  name: any
  email: any
  uuid: any
  num: any = 4
  enabled: boolean = false;
  switchValue = false;
  contenteditable: boolean = false;
  constructor(private router: Router, private socket: WebSocketService, private elementRef: ElementRef, private authService: AuthService) { }
  roomsarray: any
  inputCode: string = '';
  isVisible = true;
  ngOnInit(): void {
    localStorage.removeItem('repeat');
    window.history.pushState({}, '');
    this.getDetails();
    this.socket.emit('list room', {});

    this.socket.listen('room full').subscribe(() => {
      alert("The room is full.");
    });
    this.socket.listen('set room list').subscribe((rooms: any) => {
      this.roomsarray = rooms
    });

    this.socket.listen('no room').subscribe((data: any) => {
      alert("Room "+data.code+" not exists!");
    });
    this.socket.listen('user checked').subscribe((data: any) => {
      if (data.is_created) {
        console.log('do');
        this.router.navigate(['start']);
      } else {
        console.log('not');
        alert("User Not Found!");
        setTimeout(function () {
          window.location.reload();
        }, 2000)
      }
    });

  }
  onNameChange(val: any) {
    console.log("Changed", val)
  }
  refreshRoomList(){
    this.socket.emit('list room', {});
  }
  logout(): void {
    localStorage.clear()
    window.location.reload();
  }

  enable() {
    this.contenteditable = true
  }

  editName(e: any): boolean {
    if (e.which === 13 && !e.shiftKey) {
      console.log(e.target.textContent);
      this.authService.edit_name(e.target.textContent).subscribe((res: any) => {
        this.name = res.success.name
        sessionStorage.setItem('username', this.name);
      });
      this.contenteditable = false
      return false;
    }
    return true;
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
        if (sessionStorage.getItem('username') == null) {
          sessionStorage.setItem('username', this.name);
          sessionStorage.setItem('uuid', this.uuid);
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
