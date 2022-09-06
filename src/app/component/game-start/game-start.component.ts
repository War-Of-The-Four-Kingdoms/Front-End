import { Component, ElementRef, OnInit } from '@angular/core';
import { WebSocketService } from "../../web-socket.service";
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-game-start',
  templateUrl: './game-start.component.html',
  styleUrls: ['./game-start.component.scss']
})
export class GameStartComponent implements OnInit {
  visible = false;
  lobbyCode: string = '';
  chair1: any = 1;
  chair2: any = 2;
  chair3: any = 3;
  chair4: any = 4;
  chair5: any = 5;
  chair6: any = 6;
  roomMAX: any;
  isVisibleMiddle = false;
  host: boolean = false;
  arr: any[] = [];
  interval: any;
  chair: boolean = false;
  chair6user: boolean = false;
  chair1user: boolean = false;
  chair2user: boolean = false;
  chair3user: boolean = false;
  chair4user: boolean = false;
  chair5user: boolean = false;


  constructor(private socket: WebSocketService, private elementRef: ElementRef, private router: Router) {
    this.arr.push({
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    })
  }
  ngOnInit(): void {
    this.socket.listen('your turn').subscribe((data: any) => {
      console.log('your turn');
      var counter = 0;
      var interval = this.interval = setInterval(() => {
        counter++;
        console.log(counter);
        if (counter == 5) {
          clearInterval(interval);
        }
      }, 1000);
    });
    this.listen_position();
    this.socket.emit('get room info', {});
    this.socket.listen('leave lobby').subscribe((data: any) => {
      
    });
    this.socket.listen('sctc').subscribe((data: any) => {
      this.appendChat('<p class="text-right text-primary">' + data.username + ': ' + data.message + '</p>');
    });
    this.socket.listen('set room').subscribe((room: any) => {
      this.elementRef.nativeElement.querySelector('.show_code').textContent = room.code;
      this.lobbyCode = room.code;
      this.roomMAX = room.max;
      if (room.is_host == true) {
        this.host = true
      }

    });
  }

  listen_position() {
    this.socket.listen('assign position').subscribe((data: any) => {
      this.chair1user = false
      this.chair2user = false
      this.chair3user = false
      this.chair4user = false
      this.chair5user = false
      this.chair6user = false
      console.log(data);
      data.forEach((d: any) => {
        console.log(d.position);

        if (this.chair1 == d.position) {
          this.chair1user = true
          console.log(d.position);
          console.log(this.chair1);

        } else if (this.chair2 == d.position) {
          this.chair2user = true
        } else if (this.chair3 == d.position) {
          this.chair3user = true
        } else if (this.chair4 == d.position) {
          this.chair4user = true
        } else if (this.chair5 == d.position) {
          this.chair5user = true
        }
        else if (this.chair6 == d.position) {
          this.chair6user = true
        }
        // switch (d.position) {
        //   case 1:
        //     this.chair1user = true
        //     break;
        //   case 2:
        //     this.chair2user = true
        //     break;
        // }

      });

      // for (let j = 0; j <= data.length; j++){

      // }

    });
  }

  select_position(pos: any): void {
    switch (pos) {
      case 1:
        this.chair1 = 6
        this.chair2 = 5
        this.chair3 = 4
        this.chair4 = 3
        this.chair5 = 2
        this.chair6 = 1
        this.chair6user = true
        this.socket.emit('select position', { position: pos, code: this.lobbyCode });
        break;
      case 2:
        this.chair1 = 5
        this.chair2 = 3
        this.chair3 = 6
        this.chair4 = 1
        this.chair5 = 4
        this.chair6 = 2
        this.chair6user = true
        this.socket.emit('select position', { position: pos, code: this.lobbyCode });
        break;
      case 3:
        this.chair1 = 4
        this.chair2 = 6
        this.chair3 = 2
        this.chair4 = 5
        this.chair5 = 1
        this.chair6 = 3
        this.chair6user = true
        this.socket.emit('select position', { position: pos, code: this.lobbyCode });
        break;
      case 4:
        this.chair1 = 3
        this.chair2 = 1
        this.chair3 = 5
        this.chair4 = 2
        this.chair5 = 6
        this.chair6 = 4
        this.chair6user = true
        this.socket.emit('select position', { position: pos, code: this.lobbyCode });
        break;
      case 5:
        this.chair1 = 2
        this.chair2 = 4
        this.chair3 = 1
        this.chair4 = 6
        this.chair5 = 3
        this.chair6 = 5
        this.chair6user = true
        this.socket.emit('select position', { position: pos, code: this.lobbyCode });
        break;
      case 6:
        this.chair1 = 1
        this.chair2 = 2
        this.chair3 = 3
        this.chair4 = 4
        this.chair5 = 5
        this.chair6 = 6
        this.chair6user = true
        this.socket.emit('select position', { position: pos, code: this.lobbyCode });
        break;
      default:

        break;
    }
  }

  start(): void {
    this.socket.emit('start game', { code: this.lobbyCode });
  }

  pass(): void {
    clearInterval(this.interval);
    this.socket.emit('pass turn', { code: this.lobbyCode });
  }

  showModalMiddle(): void {
    this.isVisibleMiddle = true;
  }

  handleOkMiddle(): void {
    console.log('click ok');
    this.isVisibleMiddle = false;
  }

  handleCancelMiddle(): void {
    this.isVisibleMiddle = false;
  }


  typingChat(e: any): boolean {
    let message = this.elementRef.nativeElement.querySelector('.chat-input').textContent;
    if (e.which === 13 && !e.shiftKey) {
      this.socket.emit('scts', { message: message, code: this.lobbyCode });
      this.appendChat('<p class="box">' + message + '</p>');
      this.elementRef.nativeElement.querySelector('.chat-input').textContent = '';
      return false;
    }
    return true;
  }

  appendChat(message: string): void {
    var cl = this.elementRef.nativeElement.querySelector('.chatline');
    cl.insertAdjacentHTML('beforeend', message);
  }
  leave() {
    this.socket.emit('leave lobby', { code: this.lobbyCode, max_player: this.roomMAX });
    this.router.navigate(['home']);
  }
  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
