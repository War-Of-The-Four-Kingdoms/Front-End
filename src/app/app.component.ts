import { Component } from '@angular/core';
import { WebSocketService } from "./web-socket.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front-end';

  constructor(private socket: WebSocketService){}

  ngOnInit(): void {
    this.socket.emit('start','atp')
  }
  
}
