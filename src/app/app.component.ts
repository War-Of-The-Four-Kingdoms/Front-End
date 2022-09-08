import { Component, ElementRef } from '@angular/core';
import { WebSocketService } from "./web-socket.service";
import { DatePipe } from '@angular/common';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front-end';
  isVisible = true;
  username: any = "pong"
  isVisibleMiddle = false;
  constructor(private socket: WebSocketService, private elementRef: ElementRef, private authService: AuthService) { }

  ngOnInit(): void {
    this.socket.listen('set room').subscribe((room: any) => {
      this.elementRef.nativeElement.querySelector('.show_code').textContent = room.code;
    });
    this.socket.emit('start', this.username)

    let expireDate = new Date()
    let timestamp = expireDate.getTime();
    let expired = localStorage.getItem('expires_in')
    if (parseInt(String(expired)) <= parseInt(String(timestamp))) {
      this.authService.refresh().subscribe((res: any) => {

      })
    }


  }


  handleOk(): void {
    this.isVisible = false;
    this.socket.emit('start', this.username)
  }


}


