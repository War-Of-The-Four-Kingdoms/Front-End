import { Component, ElementRef, OnInit } from '@angular/core';
import { WebSocketService } from "../../services/web-socket.service";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-game-start',
  templateUrl: './game-start.component.html',
  styleUrls: ['./game-start.component.scss']
})
export class GameStartComponent implements OnInit {
  characterCard: boolean = false;
  visible = false;
  lobbyCode: string = '';
  stage_list = ['prepare', 'decide', 'draw', 'play', 'drop', 'end'];
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
  myPosId: any;
  hosting: boolean = false;
  roomHost: any;
  roomcode: any;
  is_private: boolean = false;
  is_started: boolean = false;
  role: any = "king";
  describe: any = { king: "Kill Traitor and Betrayer to win This Game", knight: "Protect Your king and Kill Everyone Who betray!!", villager: "Kill this Corruption King to Win the game!!", noble: "Spy and Kill Everyone" };
  extra_hp: any;
  crown1: boolean = false;
  crown2: boolean = false;
  crown3: boolean = false;
  crown4: boolean = false;
  crown5: boolean = false;
  crown6: boolean = false;
  king_pos: any;
  king_uid: any;
  myPos: any;
  activeClass: boolean = false;
  queue: any = 99;
  quitRage: any = [];
  started: boolean = false;
  counterTime: any = 0;
  clock: boolean = false;
  roles: any[] = [];
  chars: any;
  knight_uid: any[] = [];
  villager_uid: any[] = [];
  noble_uid: any[] = [];
  characterPool: any[] = [];
  myCharacter: any;
  handCard: any[] = []
  test: any;
  img1: any;
  img2: any;
  img3: any;
  img4: any;
  img5: any;
  img6: any;
  cardShow: boolean = false;
  cardCheck: any;
  panel = { active: true, name: 'This is panel header 1', disabled: false };
  showChat: boolean = true;
  stage1: any;
  stage2: any;
  stage3: any;
  stage4: any;
  stage5: any;
  stage6: any;
  chairPos: any[] = [];
  hellos: any[] = [];
  count: number = 3;
  heartShow: boolean = false;
  life1: any;
  life2: any;
  life3: any;
  life4: any;
  life5: any;
  life6: any;


  constructor(private socket: WebSocketService, private elementRef: ElementRef, private router: Router, private _ActivatedRoute: ActivatedRoute, private api: ApiService) {
    this.arr.push({
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    })
    this._ActivatedRoute.paramMap.subscribe((param) => {
      this.roomcode = param.get('code');

    })
    this.roomMAX = sessionStorage.getItem('Max');
    this.is_private = (sessionStorage.getItem('private') === 'true');
  }
  ngOnInit(): void {
    // window.addEventListener("beforeunload", function (e) {
    //   return e.returnValue = "Your message here";
    // });

    // window.onbeforeunload = function () {
    //   return "Leaving this page will reset the wizard";
    // }

    this.socket.listen('random characters').subscribe((data: any) => {
      console.log(data);
      this.characterCard = true;
      this.characterPool = data
      this.characterPool.forEach((c: any) => {
        c.image_name = "../assets/picture/card/" + c.image_name
      });
    });
    this.socket.listen('assign roles').subscribe((data: any) => {
      this.started = true
      this.crown1 = false
      this.crown2 = false
      this.crown3 = false
      this.crown4 = false
      this.crown5 = false
      this.crown6 = false
      this.king_pos = data.king.position;
      this.king_uid = data.king.uid;
      this.role = data.me.role;
      console.log(this.role);
      if (this.myPosId == this.king_uid) {
        this.extra_hp = 1
        this.crown4 = true
      } else {
        if (this.chair1 == this.king_pos) {
          this.crown1 = true
        } else if (this.chair2 == this.king_pos) {
          this.crown2 = true
        }
        else if (this.chair3 == this.king_pos) {
          this.crown3 = true
        }
        else if (this.chair4 == this.king_pos) {
          this.crown4 = true
        }
        else if (this.chair5 == this.king_pos) {
          this.crown5 = true
        }
        else if (this.chair6 == this.king_pos) {
          this.crown6 = true
        }
      }
    });
    if (this.is_started) {
      window.addEventListener("beforeunload", function (e) {
        var confirmationMessage = "You will lost the process.";
        e.returnValue = confirmationMessage;
        return confirmationMessage;
      });
    }

    this.socket.listen('next turn').subscribe((pos: any) => {
      console.log(pos);
      this.clock = true
      // if (this.myPos == pos) {
      //   // this.counterTime = 0
      //   console.log('your turn');
      // } else {
      //   // this.counterTime = 0
      //   console.log('other turn');

      // }

      // var interval = this.interval = setInterval(() => {
      //   this.counterTime++;
      //   console.log(this.counterTime);
      //   if (this.counterTime >= 30) {
      //     clearInterval(interval);
      //   }
      // }, 1000);
      this.queue = pos
    });
    this.socket.listen('change stage').subscribe((data: any) => {
      console.log(data);
      let othericon = this.elementRef.nativeElement.querySelector('.finish')
      if (othericon != null) {
        othericon.classList.remove("finish")
        othericon.classList.add("nonfinish")
      }
      if (data.position != this.myPos) {
        let chairIndex = this.chairPos.indexOf(data.position)
        let stageIndex = this.stage_list.indexOf(data.stage)
        let icon = this.elementRef.nativeElement.querySelector("#" + CSS.escape(String(chairIndex) + String(stageIndex + 1)))
        icon.classList.remove("nonfinish")
        icon.classList.add("finish")
      }
      this.counterTime = 0
      var interval = this.interval = setInterval(() => {
        this.counterTime++;
        console.log(this.counterTime);
        if (this.counterTime >= 30) {
          clearInterval(interval);
        }
      }, 1000);

    });



    this.listen_position();

    this.socket.emit('get room info', { code: this.roomcode, max_player: this.roomMAX, username: sessionStorage.getItem('username'), private: this.is_private });
    this.socket.listen('need more player').subscribe(() => {
      this.started = false
      alert('This game require atleast 4 players.')
    });
    this.socket.listen('sctc').subscribe((data: any) => {
      this.appendChat('<div class="text-start w-100 p-2"><p class="m-2 p-2 pb-0" style="color:#C2C2C2;">'+data.username+'</p><span class="m-2 p-2" style="font-size:15px;border-radius: 20px;color: white;background-color:#616161;">'+data.message+'</span></div>');
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
      sessionStorage.setItem('Max', room.max);
      this.myPosId = room.uid;
      this.roomHost = room.host
      this.is_private = room.private;
      sessionStorage.setItem('private', room.private);
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
    this.socket.listen('change host').subscribe((uid: any) => {
      this.roomHost = uid.host
      this.hosting1 = false
      this.hosting2 = false
      this.hosting3 = false
      this.hosting4 = false
      this.hosting5 = false
      this.hosting6 = false
      console.log(uid);
      console.log(this.myPosId);
      if (this.myPosId == uid.host) {
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
      this.quitRage.push(data.position)
      console.log(this.quitRage.includes(this.chair1));
      console.log(this.quitRage.includes(this.chair2));
      console.log(this.quitRage.includes(this.chair3));
      console.log(this.quitRage.includes(this.chair4));
      console.log(this.quitRage.includes(this.chair5));
      console.log(this.quitRage.includes(this.chair6));
    });
    this.socket.listen('skip').subscribe(() => {
      clearInterval(this.interval);
    });

    this.socket.listen('waiting other select character').subscribe((data: any) => {
      console.log("waiting");
      this.characterCard = false;
    });

    this.socket.listen('ready to start').subscribe((data: any) => {
      console.log("ready to start");
      this.api.drawCard(this.roomcode).subscribe((res: any) => {
        console.log(res);
        this.handCard = res;
        this.socket.emit('draw card ', { hand: this.handCard, code: this.roomcode });
      });
      this.characterCard = false;
      console.log(this.myCharacter);

    });
    this.socket.listen('set player character').subscribe((data: any) => {
      console.log(data);

      console.log(this.myPos);
      if (this.myPos == data.position) {
        this.test = "../assets/picture/card/" + data.character
        this.life4 = data.remain_hp
      } else {
        if (this.chair1 == data.position) {
          this.img1 = "../assets/picture/card/" + data.character
          this.life1 = data.remain_hp
        } else if (this.chair2 == data.position) {
          this.img2 = "../assets/picture/card/" + data.character
          this.life2 = data.remain_hp
        } else if (this.chair3 == data.position) {
          this.img3 = "../assets/picture/card/" + data.character
          this.life3 = data.remain_hp
        } else if (this.chair4 == data.position) {
          this.img4 = "../assets/picture/card/" + data.character
          this.life4 = data.remain_hp
        }
        else if (this.chair5 == data.position) {
          this.img5 = "../assets/picture/card/" + data.character
          this.life5 = data.remain_hp
        }
        else if (this.chair6 == data.position) {
          this.img6 = "../assets/picture/card/" + data.character
          this.life6 = data.remain_hp
        }
      }
      console.log(this.life6);
      console.log(this.life5);
      console.log(this.life4);
      console.log(this.life3);
      console.log(this.life2);
      console.log(this.life1);
      // if (data.position != this.myPos) {
      //   let chairIndex = this.chairPos.indexOf(data.position)
      //   let stageIndex = this.stage_list.indexOf(data.stage)
      //   let icon = this.elementRef.nativeElement.querySelector("#" + CSS.escape(String(chairIndex) + String(stageIndex + 1)))
      //   icon.classList.remove("nonfinish")
      //   icon.classList.add("finish")
      // }
    });
  }

  loopChair() {
    // const element = array[index];
    this.chairPos[1] = this.chair1
    this.chairPos[2] = this.chair2
    this.chairPos[3] = this.chair3
    this.chairPos[4] = this.chair4
    this.chairPos[5] = this.chair5
    this.chairPos[6] = this.chair6
  }


  showCard(card: any) {
    this.cardShow = true
    this.cardCheck = card
    console.log(this.cardCheck);
  }

  cancelShow() {
    this.cardShow = false
  }

  drawCard() {
    this.handCard.push(18)
  }

  openChat() {
    this.showChat = !this.showChat
  }

  copyCodeToClipboard() {
    navigator.clipboard.writeText(this.roomcode);
    let a = this.elementRef.nativeElement.querySelector('.copy-noti');
    a.classList.remove('hidden');
    a.classList.add('visible');
    let hidenoti = setTimeout(() => { a.classList.remove('visible'); a.classList.add('hidden'); }, 1000);

  }
  useCard() {
    //   console.log(this.handCard);
    // this.handCard.forEach(element => {

    // });
    // const index = this.handCard.indexOf(this.cardCheck.id);
    // this.handCard.splice(index);
    // this.cardShow = false
    for (let i = this.handCard.length - 1; i >= 0; i--) {
      if (this.handCard[i].id === this.cardCheck.id) {
        this.handCard.splice(i, 1);
      }
    }
  }


  selectCharacter(char: any) {
    this.socket.emit('character selected', { cid: char.id, code: this.roomcode });
    this.myCharacter = char
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
    this.loopChair()
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
        this.myPos = pos
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
        this.myPos = pos
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
        this.myPos = pos
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
        this.myPos = pos
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
        this.myPos = pos
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
        this.myPos = pos
        this.socket.emit('select position', { position: pos, code: this.lobbyCode });
        break;
      default:
        break;
    }
    this.loopChair();
  }

  start(): void {
    this.socket.emit('start game', { code: this.lobbyCode, roles: this.roles, characters: this.chars });
  }

  pass(): void {
    clearInterval(this.interval);
    this.socket.emit('end stage', { code: this.lobbyCode });
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

  counter(i: any) {
    return new Array(i);
  }

  typingChat(e: any): boolean {
    let message = this.elementRef.nativeElement.querySelector('.chat-input').textContent;
    if (e.which === 13 && !e.shiftKey) {
      this.socket.emit('scts', { message: message, code: this.lobbyCode });
      this.appendChat('<div class="text-end w-100 p-2"><span class="m-2 p-2" style="font-size:15px;border-radius: 20px;color: white;background-color: #9A20DD;">'+message+'</span></div>');
      this.elementRef.nativeElement.querySelector('.chat-input').textContent = '';
      return false;
    }
    return true;
  }

  appendChat(message: string): void {
    var cl = this.elementRef.nativeElement.querySelector('.chatline');
    cl.insertAdjacentHTML('beforeend', message);
    cl.scrollTop = cl.scrollHeight;
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
