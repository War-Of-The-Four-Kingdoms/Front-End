import { Component } from '@angular/core';
import { WebSocketService } from "./web-socket.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front-end';
  isVisible = true;
  username:any =''
  constructor(private socket: WebSocketService){}

  ngOnInit(): void {
    
  }

  

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
    this.socket.emit('start',this.username)
  }


}
  

