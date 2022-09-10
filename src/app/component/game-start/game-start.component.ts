import { Component, ElementRef, OnInit } from '@angular/core';
import { WebSocketService } from "../../web-socket.service";
import { ActivatedRoute, Router } from '@angular/router';
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
  chair6: any = 6;
  chair2: any = 2;
  chair5: any = 5;
  chair3: any = 3;
  chair4: any = 4;
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
  hosting1: boolean = false;
  hosting2: boolean = false;
  hosting3: boolean = false;
  hosting4: boolean = false;
  hosting5: boolean = false;
  hosting6: boolean = false;
  myId: any;
  hosting: boolean = false;
  roomHost: any;
  roomcode: any;
  is_started: boolean = false;

  constructor(private socket: WebSocketService, private elementRef: ElementRef, private router: Router, private _ActivatedRoute: ActivatedRoute) {
    this.arr.push({
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    })
    this._ActivatedRoute.paramMap.subscribe((param) => {
      this.roomcode = param.get('code');
      this.roomMAX = sessionStorage.getItem('Max');
    } )
  }
  ngOnInit(): void {
    this.socket.listen('assign roles').subscribe((data: any) => {
      console.log(data);
    });
    if(this.is_started){
      window.addEventListener("beforeunload", function (e) {
        var confirmationMessage = "You will lost the process.";
        e.returnValue = confirmationMessage;
        return confirmationMessage;
      });
    }

    this.socket.listen('next turn').subscribe((pos: any) => {
      if(this.chair4==pos){
        console.log('your turn');
      }else{
        console.log('other turn');
      }
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

      this.socket.emit('get room info', {code: this.roomcode, max_player: this.roomMAX , username: sessionStorage.getItem('username')});



    this.socket.listen('sctc').subscribe((data: any) => {
      this.appendChat('<p class="text-right text-primary">' + data.username + ': ' + data.message + '</p>');
    });
    this.socket.listen('set room').subscribe((room: any) => {
      this.hosting1 = false
      this.hosting2 = false
      this.hosting3 = false
      this.hosting4 = false
      this.hosting5 = false
      this.hosting6 = false
      console.log(room);
      this.elementRef.nativeElement.querySelector('.show_code').textContent = room.code;
      this.lobbyCode = room.code;
      this.roomMAX = room.max;
      sessionStorage.setItem('Max',room.max);
      this.myId = room.uid;
      this.roomHost = room.host
      console.log(this.roomHost);
      if (room.is_host == true) {
        this.host = true
      } else {
        room.positions.forEach((d: any) => {
          if (this.chair1 == d.position) {
            this.chair1user = true
            if (d.uid == this.roomHost) {
              this.hosting1 = true
            }
          } else if (this.chair2 == d.position) {
            this.chair2user = true
            if (d.uid == this.roomHost) {
              this.hosting2 = true
            }
          } else if (this.chair3 == d.position) {
            this.chair3user = true
            if (d.uid == this.roomHost) {
              this.hosting3 = true
            }
          } else if (this.chair4 == d.position) {
            this.chair4user = true
            if (d.uid == this.roomHost) {
              this.hosting4 = true
            }
          } else if (this.chair5 == d.position) {
            this.chair5user = true
            if (d.uid == this.roomHost) {
              this.hosting5 = true
            }
          }
          else if (this.chair6 == d.position) {
            this.chair6user = true
            if (d.uid == this.roomHost) {
              this.hosting6 = true
            }
          }
        });
      }

    });
    this.socket.listen('change host').subscribe((uid:any) => {
      this.roomHost = uid.host
      this.hosting1 = false
      this.hosting2 = false
      this.hosting3 = false
      this.hosting4 = false
      this.hosting5 = false
      this.hosting6 = false
      console.log(uid);
      console.log(this.myId);
      if (this.myId == uid.host) {
        console.log('yes');
        this.host = true
        this.hosting4 = true
      } else {
        console.log('no');
        this.host = false
        uid.positions.forEach((d: any) => {
          if (this.chair1 == d.position) {
            this.chair1user = true
            if (d.uid == uid.host) {
              this.hosting1 = true
            }
          } else if (this.chair2 == d.position) {
            this.chair2user = true
            if (d.uid == uid.host) {
              this.hosting2 = true
            }
          } else if (this.chair3 == d.position) {
            this.chair3user = true
            if (d.uid == uid.host) {
              this.hosting3 = true
            }
          } else if (this.chair4 == d.position) {
            this.chair4user = true
            if (d.uid == uid.host) {
              this.hosting4 = true
            }
          } else if (this.chair5 == d.position) {
            this.chair5user = true
            if (d.uid == uid.host) {
              this.hosting5 = true
            }
          }
          else if (this.chair6 == d.position) {
            this.chair6user = true
            if (d.uid == uid.host) {
              this.hosting6 = true
            }
          }
        });
      }
    });
    this.socket.listen('player leave').subscribe((data: any) => {
      console.log(data);
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
      this.hosting1 = false
      this.hosting2 = false
      this.hosting3 = false
      this.hosting4 = false
      this.hosting5 = false
      this.hosting6 = false
      data.forEach((d: any) => {
        if (this.chair1 == d.position) {
          this.chair1user = true
          if (d.uid == this.roomHost) {
            this.hosting1 = true
          }
        } else if (this.chair2 == d.position) {
          this.chair2user = true
          if (d.uid == this.roomHost) {
            this.hosting2 = true
          }
        } else if (this.chair3 == d.position) {
          this.chair3user = true
          if (d.uid == this.roomHost) {
            this.hosting3 = true
          }
        } else if (this.chair4 == d.position) {
          this.chair4user = true
          if (d.uid == this.roomHost) {
            this.hosting4 = true
          }
        } else if (this.chair5 == d.position) {
          console.log(this.chair5);
          console.log(d.position);

          this.chair5user = true
          if (d.uid == this.roomHost) {
            this.hosting5 = true
          }
        }
        else if (this.chair6 == d.position) {
          this.chair6user = true
          if (d.uid == this.roomHost) {
            this.hosting6 = true
          }
        }
      });
    });
  }

  select_position(pos: any): void {
    switch (pos) {
      case 1:
        this.chair1 = 4
        this.chair2 = 5
        this.chair3 = 6
        this.chair4 = 1
        this.chair5 = 2
        this.chair6 = 3
        this.chair4user = true
        if (this.host == true) {
          this.hosting4 = true
        }
        this.socket.emit('select position', { position: pos, code: this.lobbyCode });
        break;
      case 2:
        this.chair1 = 5
        this.chair2 = 6
        this.chair3 = 1
        this.chair4 = 2
        this.chair5 = 3
        this.chair6 = 4
        this.chair4user = true
        if (this.host == true) {
          this.hosting4 = true
        }
        this.socket.emit('select position', { position: pos, code: this.lobbyCode });
        break;
      case 3:
        this.chair1 = 6
        this.chair2 = 1
        this.chair3 = 2
        this.chair4 = 3
        this.chair5 = 4
        this.chair6 = 5
        this.chair4user = true
        if (this.host == true) {
          this.hosting4 = true
        }
        this.socket.emit('select position', { position: pos, code: this.lobbyCode });
        break;
      case 4:
        this.chair1 = 1
        this.chair2 = 2
        this.chair3 = 3
        this.chair4 = 4
        this.chair5 = 5
        this.chair6 = 6
        this.chair4user = true
        if (this.host == true) {
          this.hosting4 = true
        }
        this.socket.emit('select position', { position: pos, code: this.lobbyCode });
        break;
      case 5:
        this.chair1 = 2
        this.chair2 = 3
        this.chair3 = 4
        this.chair4 = 5
        this.chair5 = 6
        this.chair6 = 1
        this.chair4user = true
        if (this.host == true) {
          this.hosting4 = true
        }
        this.socket.emit('select position', { position: pos, code: this.lobbyCode });
        break;
      case 6:
        this.chair1 = 3
        this.chair2 = 4
        this.chair3 = 5
        this.chair4 = 6
        this.chair5 = 1
        this.chair6 = 2
        this.chair4user = true
        if (this.host == true) {
          this.hosting4 = true
        }
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
      this.appendChat('<p class="text-end text-success message" style="font-size:24px;width:90%;">' + message + '</p>');
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
    this.socket.emit('select position', { position: 0, code: this.lobbyCode });
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
