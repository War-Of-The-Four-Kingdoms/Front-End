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
  alreadyOpen = false;
  constructor(private socket: WebSocketService, private elementRef: ElementRef, private authService: AuthService) { }

  ngOnInit(): void {
    this.socket.listen('already connect').subscribe((rooms: any) => {
      this.alreadyOpen = true;
    });
  }



}


