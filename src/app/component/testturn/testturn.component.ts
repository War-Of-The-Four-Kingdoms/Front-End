import { Component, OnInit } from '@angular/core';
import { WebSocketService } from "../../web-socket.service";

@Component({
  selector: 'app-testturn',
  templateUrl: './testturn.component.html',
  styleUrls: ['./testturn.component.scss']
})
export class TestturnComponent implements OnInit {

  constructor(private socket: WebSocketService) { }

  interval:any ;
  ngOnInit(): void {
    this.socket.listen('your_turn').subscribe((data: any) => {
      console.log('your_turn');
      var counter = 0;
      var interval = this.interval = setInterval(() => {
        counter++;
        console.log(counter);
        if (counter == 5) {
            this.pass_turn()
            clearInterval(interval);
        }
    }, 1000);
      });
  }

  pass_turn(): void {
      console.log('pass_turn');
      clearInterval(this.interval);
      this.socket.emit('pass_turn',[]);
  }
}
