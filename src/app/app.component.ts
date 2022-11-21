import { Component, ElementRef } from '@angular/core';
import { WebSocketService } from './services/web-socket.service';
import { DatePipe } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'front-end';
  isVisible = true;
  username: any = 'pong';
  isVisibleMiddle = false;
  alreadyOpen = false;
  is_login = false;
  constructor(
    private socket: WebSocketService,
    private elementRef: ElementRef,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('access_token')) {
      let expireDate = new Date();
      let timestamp = Math.floor(expireDate.getTime() / 1000);
      let expired = localStorage.getItem('expires_in');
      if (parseInt(String(expired)) <= parseInt(String(timestamp))) {
        this.authService.refresh().subscribe((res: any) => {
          let expireDate = new Date();
          let timestamp =
            Math.floor(expireDate.getTime() / 1000) + res.expires_in;
          localStorage.setItem('access_token', res.access_token);
          localStorage.setItem('refresh_token', res.refresh_token);
          localStorage.setItem('expires_in', timestamp);
          this.getDetails();
        });
      } else {
        this.getDetails();
      }
      this.is_login = true;
    }
    else{
      this.is_login = false;
    }

    this.socket.listen('already connect').subscribe((rooms: any) => {
      this.alreadyOpen = true;
    });
  }

  logout(): void {
    localStorage.clear()
    window.location.reload();
  }
  async getDetails(): Promise<any> {
    await this.authService.detail().subscribe((res: any) => {
      sessionStorage.setItem('username',res.success.name);
      sessionStorage.setItem('uuid',res.success.uuid);
    });
  }
}
