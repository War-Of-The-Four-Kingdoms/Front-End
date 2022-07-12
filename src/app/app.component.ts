import { Component, ElementRef } from '@angular/core';
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
  isVisibleMiddle = false;
  constructor(private socket: WebSocketService,private elementRef:ElementRef){}

  ngOnInit(): void {
    this.socket.listen('set room').subscribe((room: any) => {
      console.log(room)
      this.elementRef.nativeElement.querySelector('.show_code').textContent = room.code;
  });
  }


  handleOk(): void {
    this.isVisible = false;
    this.socket.emit('start',this.username)
  }


}
  

