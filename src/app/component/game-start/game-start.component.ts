import { Component, ElementRef, OnInit } from '@angular/core';
import { WebSocketService } from "../../services/web-socket.service";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
import { Queue } from 'queue-typescript';

@Component({
  selector: 'app-game-start',
  templateUrl: './game-start.component.html',
  styleUrls: ['./game-start.component.scss']
})
export class GameStartComponent implements OnInit {
  dropFire:boolean = true;
  turnChange:boolean = false;
  textTurn:any = "";
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
  martinQueue: boolean = false;
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
  decisionCard: any[] = [];
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
  inGameChar: any[] = [];
  prepareQueue: any;
  decideQueue: any;
  drawQueue: any;
  playQueue: any;
  dropQueue: any;
  endQueue: any;
  currentQueue: any;
  showDecisionTemplate: boolean = false;
  //processing
  attackCount: any
  drawAdjust: any;
  attackDistance: any;
  trickDistance: any;
  targetedDistance: any;
  specialDefense: any;
  specialAttack: any;
  specialStage: any;
  decisionResult: any = null;
  dc_condition: any = null;

  //dropcard
  selectedItems: any[] = [];
  showDropTemplate: boolean = true;

  //foxia
  storeConfirm: boolean = false;
  foxiaStoredCard: any[] = [];
  showRole: any;
  showText: any;
  showTrigger: boolean = false;
  waiting: boolean = false;
  effectCharacter: any;
  effectDescription: any;
  testing: any[] = [];
  groupEffect: boolean = false;
  showDraw: any[] = [];
  chairNone1: boolean = true;
  isFoxiaEffect: boolean = false;

  //merguin
  merguinSelection: boolean = false;
  test555: boolean = false;
  dropCard: any[] = [];


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
    this.socket.listen('set decision result').subscribe((data: any) => {
      this.decisionResult = data.card;
    });
    this.socket.listen('random characters').subscribe((data: any) => {
      this.characterCard = true;
      this.characterPool = data
      this.characterPool.forEach((c: any) => {
        c.image_name = "../assets/picture/card/" + c.image_name
      });
    });
    this.socket.listen('assign roles').subscribe((data: any) => {
      for (var i = 1; i < 7; i++) {
        if (this.testing.includes(this.chairPos[i])) {
        } else {
          let icon = this.elementRef.nativeElement.querySelector("#chair" + i)
          let icons = this.elementRef.nativeElement.querySelector("#card" + i)
          icon.classList.remove("user" + i)
          icons.classList.remove("player" + i)
          icons.classList.add("none")
          icon.classList.add("none")
        }
      }
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
      switch (this.role) {
        case 'king':
          this.showRole = "../assets/picture/crowns.png"
          this.showText = "Kill all Betrayer and Villager"
          break;
        case 'knight':
          this.showRole = "../assets/picture/plus.png"
          this.showText = "Protect Your King to win this Game"
          break;
        case 'betrayer':
          this.showRole = "../assets/picture/plus.png"
          this.showText = "Be the last one to win this Game"
          break;
        case 'villager':
          this.showRole = "../assets/picture/plus.png"
          this.showText = "Kill the King to win this GAME"
          break;
      }
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
      clearInterval(this.interval)
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
      clearInterval(this.interval);
      var interval = this.interval = setInterval(() => {
        this.counterTime++;
        if (this.counterTime >= 30) {
          clearInterval(interval);
        }
      }, 1000);
      if (data.position == this.myPos) {
        console.log(data.stage);
        switch (data.stage) {     
          case 'prepare':
            this.drawAdjust = 0;
            this.currentQueue = 'prepare';
            this.prepareQueue = new Queue<Object>();
            if (this.role == 'king' && this.inGameChar.find(c => c.character.char_name == 'martin') && this.myCharacter.char_name != 'martin') {
              this.prepareQueue.enqueue({ waiting: true, name: 'martin' });
            }
            if (this.myCharacter.char_name == 'foxia') {
              this.prepareQueue.enqueue({ waiting: false, name: 'foxia' });
            }
            this.prepareStage();
            break;
          case 'decide':
            this.currentQueue = 'decide';
            this.decideQueue = new Queue<Object>();

            if (this.decisionCard.length > 0) {
              this.decisionCard.forEach(d => {
                if (this.inGameChar.find(c => c.character.char_name == 'merguin') && this.myCharacter.char_name != 'merguin') {
                  this.decideQueue.enqueue({ waiting: true, name: 'merguin' });
                }
                this.decideQueue.enqueue({ waiting: false, name: d.item_name });
              });
            }
            this.decideStage();
            break;
          case 'draw':
            this.textTurn = "DRAW PHARSE"
            this.turnChange = true
            setTimeout(() => { 
            this.currentQueue = 'draw';
            this.drawQueue = new Queue<Object>();
            this.drawQueue.enqueue({ waiting: false, name: 'draw' });
            this.turnChange = false
            this.drawStage();
          }, 2000);
            break;
          case 'play':
            this.currentQueue = 'play';
            this.playQueue = new Queue<Object>();
            this.playStage();
            break;
          case 'drop':
            this.textTurn = "DROP PHARSE"
            this.turnChange = true
            setTimeout(() => { 
            this.currentQueue = 'drop';
            this.dropQueue = new Queue<Object>();
            if (this.handCard.length > this.life4) {
              this.dropQueue.enqueue({ waiting: false, name: 'drop' });
            }
            this.turnChange = false
            this.dropStage();
          }, 2000);
            break;
          case 'end':
            this.currentQueue = 'end';
            this.endQueue = new Queue<Object>();
            this.endStage();
            break;
        }
      }
    });
    this.socket.listen('trigger special effect').subscribe((target: any) => {
      console.log(target);
      this.flexAction(this.myCharacter.char_name);
      this.showTrigger = true
      this.waiting = false
      console.log('effect');

    });
    this.socket.listen('next queue').subscribe(() => {
      this.showTrigger = false
      this.waiting = false;
      this.next_queue();
    });

    this.socket.listen('draw num adjust').subscribe((data: any) => {
      this.drawAdjust = data.num;
    });

    this.listen_position();

    this.socket.emit('get room info', { code: this.roomcode, max_player: this.roomMAX, username: sessionStorage.getItem('username'), private: this.is_private });
    this.socket.listen('need more player').subscribe(() => {
      this.started = false
      alert('This game require atleast 4 players.')
    });
    this.socket.listen('sctc').subscribe((data: any) => {
      let lastchat = this.elementRef.nativeElement.querySelector('.chatline').lastElementChild;
      if (lastchat != null) {
        if (lastchat.getAttribute("attr-username") == data.username) {
          this.appendChat('<div class="w-100 pb-1 px-3" attr-username="' + data.username + '"><div class="py-2 px-3" style="font-size:15px;border-radius: 20px;color: white;background-color:#616161;max-width: fit-content;"><span style="overflow-wrap: break-word;">' + data.message + '</span></div></div>');
        } else {
          this.appendChat('<div class="w-100 pb-1 px-3" attr-username="' + data.username + '"><p class="mx-2 my-1 p-2 pb-0" style="color:#C2C2C2;">' + data.username + '</p><div class="py-2 px-3" style="font-size:15px;border-radius: 20px;color: white;background-color:#616161;max-width: fit-content;"><span style="overflow-wrap: break-word;">' + data.message + '</span></div></div>');
        }
      } else {
        this.appendChat('<div class="w-100 pb-1 px-3" attr-username="' + data.username + '"><p class="mx-2 my-1 p-2 pb-0" style="color:#C2C2C2;">' + data.username + '</p><div class="py-2 px-3" style="font-size:15px;border-radius: 20px;color: white;background-color:#616161;max-width: fit-content;"><span style="overflow-wrap: break-word;">' + data.message + '</span></div></div>');
      }

    });
    this.socket.listen('set room').subscribe((room: any) => {
      this.hosting1 = false
      this.hosting2 = false
      this.hosting3 = false
      this.hosting4 = false
      this.hosting5 = false
      this.hosting6 = false

      this.elementRef.nativeElement.querySelector('.show_code').textContent = room.code;
      this.lobbyCode = room.code;
      this.roomMAX = room.max;
      sessionStorage.setItem('Max', room.max);
      this.myPosId = room.uid;  
      this.roomHost = room.host
      this.is_private = room.private;
      sessionStorage.setItem('private', room.private);
      if (room.is_host == true) {
        this.host = true
      } else {
        room.players.forEach((d: any) => {
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
      if (this.myPosId == uid.host) {
        this.host = true
        this.hosting4 = true
      } else {
        this.host = false
        uid.players.forEach((d: any) => {
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
      this.quitRage.push(data.position)
    });
    this.socket.listen('waiting other select character').subscribe((data: any) => {
      this.characterCard = false;
    });

    this.socket.listen('ready to start').subscribe((data: any) => {
      this.api.drawCard(this.roomcode, 4).subscribe((res: any) => {
        this.handCard = res;
        console.log(res);

        this.socket.emit('draw card ', { hand: this.handCard, code: this.roomcode });
      });
      this.characterCard = false;

    });
    this.socket.listen('set player character').subscribe((data: any) => {
      this.inGameChar.push(data);
      console.log(this.inGameChar);
      if (this.myPos == data.position) {
        this.test = "../assets/picture/card/" + data.character.image_name
        this.life4 = data.remain_hp
      } else {
        if (this.chair1 == data.position) {
          this.img1 = "../assets/picture/card/" + data.character.image_name
          this.life1 = data.remain_hp
        } else if (this.chair2 == data.position) {
          this.img2 = "../assets/picture/card/" + data.character.image_name
          this.life2 = data.remain_hp
        } else if (this.chair3 == data.position) {
          this.img3 = "../assets/picture/card/" + data.character.image_name
          this.life3 = data.remain_hp
        } else if (this.chair4 == data.position) {
          this.img4 = "../assets/picture/card/" + data.character.image_name
          this.life4 = data.remain_hp
        }
        else if (this.chair5 == data.position) {
          this.img5 = "../assets/picture/card/" + data.character.image_name
          this.life5 = data.remain_hp
        }
        else if (this.chair6 == data.position) {
          this.img6 = "../assets/picture/card/" + data.character.image_name
          this.life6 = data.remain_hp
        }
      }
      // if (data.position != this.myPos) {
      //   let chairIndex = this.chairPos.indexOf(data.position)
      //   let stageIndex = this.stage_list.indexOf(data.stage)
      //   let icon = this.elementRef.nativeElement.querySelector("#" + CSS.escape(String(chairIndex) + String(stageIndex + 1)))
      //   icon.classList.remove("nonfinish")
      //   icon.classList.add("finish")
      // }
    });
  }
  next_queue() {
    switch (this.currentQueue) {
      case 'prepare':
        this.prepareStage();
        break;
      case 'decide':
        this.decideStage();
        break;
      case 'draw':
        this.drawStage();
        break;
      case 'play':
        this.playStage();
        break;
      case 'drop':
        this.dropStage();
        break;
      case 'end':
        this.endStage();
        break;
    }
  }

  decideStage() {
    if (this.decideQueue.length > 0) {
      let q = this.decideQueue.dequeue();
      if (q.waiting) {
        this.flexAction(q.name);
        this.waiting = true
        this.showTrigger = true
        this.cardMethod(q.name);
      } else {
        this.cardMethod(q.name);
      }
    } else {
      clearInterval(this.interval);
      this.socket.emit('end stage', { code: this.lobbyCode });
    }
  }

  drawStage() {
    if (this.drawQueue.length > 0) {
      let q = this.drawQueue.dequeue();
      if (q.waiting) {
        this.cardMethod(q.name);
      } else {
        this.showDraw = []
        if (q.name == 'draw') {
            this.api.drawCard(this.roomcode, 2 + this.drawAdjust).subscribe((data: any) => {
              //effect
              console.log(data);
              this.test555 = true
              this.showDraw = data
              setTimeout(() => {
                data.forEach((card: any) => {
                  this.handCard.push(card);
                  this.test555 = false
                });
              } , 4000);
            });
          this.socket.emit("update inhand card", { code: this.lobbyCode, hand: this.handCard });
        } else {
          this.cardMethod(q.name);
        }
      }
    } else {
      clearInterval(this.interval);
      this.socket.emit('end stage', { code: this.lobbyCode });
    }
  }

  playStage() {
    if (this.playQueue.length > 0) {
      let q = this.playQueue.dequeue();
      if (q.waiting) {

        this.cardMethod(q.name);
      } else {

        this.cardMethod(q.name);
      }
    } else {
      clearInterval(this.interval);
      this.socket.emit('end stage', { code: this.lobbyCode });
    }
  }

  dropStage() {
    if (this.dropQueue.length > 0) {
      let q = this.dropQueue.dequeue();
      if (q.waiting) {

        this.cardMethod(q.name);
      } else {
        if (q.name == 'drop') {
          this.showDrop();
        } else {
          this.cardMethod(q.name);
        }
      }
    } else {
      clearInterval(this.interval);
      this.socket.emit('end stage', { code: this.lobbyCode });
    }
  }

  endStage() {
    if (this.endQueue.length > 0) {
      let q = this.endQueue.dequeue();
      if (q.waiting) {

        this.cardMethod(q.name);
      } else {

        this.cardMethod(q.name);
      }
    } else {
      clearInterval(this.interval);
      this.socket.emit('end stage', { code: this.lobbyCode });
    }
  }


  showDrop() {
    this.showDropTemplate = !this.showDropTemplate;
  }
  checkedState(event: any) {
    if (event.target.checked === true) {
      if (this.selectedItems.length < (this.handCard.length - this.life4)) {
        this.selectedItems.push(event.target.value)
      } else {
        event.target.checked = false;
      }
    } else {
      this.selectedItems = this.selectedItems.filter(dc => dc != event.target.value)
    }
    console.log(this.selectedItems);
    this.dropCard = this.selectedItems

  }
  checkedMerguin(event: any) {
    if (event.target.checked === true) {
      if (this.selectedItems.length < 1) {
        this.selectedItems.push(event.target.value)
      } else {
        event.target.checked = false;
      }
    } else {
      this.selectedItems = this.selectedItems.filter(sc => sc != event.target.value)
    }
  }
  useMerguinEffect() {
    let result_card = this.handCard.find(hc => hc.id == this.selectedItems[0]);
    this.socket.emit('merguin effect', { code: this.roomcode, card: result_card });
    this.handCard = this.handCard.filter(hc => hc.id != this.selectedItems[0]);
    this.socket.emit("update inhand card", { code: this.lobbyCode, hand: this.handCard });
    this.api.dropCard(this.roomcode, this.selectedItems).subscribe((data: any) => {
      console.log(data);
    });
    this.selectedItems = [];
    this.socket.emit('special effect end', { code: this.roomcode });
    this.merguinSelection = false;
  }

  dropSelectedCard() {
    this.dropFire = true 
    setTimeout(() => {  
      this.dropFire = false 
    this.selectedItems.forEach(item => {
      this.handCard = this.handCard.filter(hc => hc.id != item)
    });
    this.socket.emit("update inhand card", { code: this.lobbyCode, hand: this.handCard });
    this.api.dropCard(this.roomcode, this.selectedItems).subscribe((data: any) => {
      console.log(data);
      
    });
    this.showDropTemplate = false;
    this.selectedItems = [];
    this.next_queue();
  }, 3000);
  }

  prepareStage() {
    if (this.prepareQueue.length > 0) {
      let q = this.prepareQueue.dequeue();
      console.log(q);
      if (q.waiting) {
        //waitng others
        this.flexAction(q.name);
        this.waiting = true
        this.showTrigger = true
        this.cardMethod(q.name);
      } else {
        this.waiting = false
        this.showTrigger = false
        this.cardMethod(q.name);
      }
    } else {
      clearInterval(this.interval);
      this.socket.emit('end stage', { code: this.lobbyCode });
    }
  }
  specialEffect() {
    if (this.myCharacter.char_name == 'martin') {
      //this.drawCard();
      this.socket.emit('martin effect', { code: this.roomcode });
      this.socket.emit('special effect end', { code: this.roomcode });
    } else if (this.myCharacter.char_name == 'merguin') {
      this.merguinSelection = true;
    }
    // else if(){

    // }

    this.showTrigger = false
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
  }

  cancelShow() {
    this.cardShow = false
  }

  openDecisionCard(is_draw: boolean) {
    if (is_draw) {
      this.api.openCard(this.roomcode).subscribe((card: any) => {
        let x = card;
        if (this.myCharacter.char_name == 'foxia') {
          let symbols = ['club', 'spade'];
          let s_check = false;
          symbols.forEach((sb: any) => {
            if (x.symbol == sb) {
              s_check = true;
            }
          });
          this.decisionResult = x;
          if (s_check) {
            this.storeConfirm = true;
          } else {
            setTimeout(() => { this.foxiaCancel() }, 3000);
          }
        } else {
          if (this.myCharacter.char_name == 'owliver') {
            this.handCard.push(x);
            this.api.updateInUse(this.roomcode, [x.id]).subscribe((data: any) => {
              console.log(data);
            });
            this.socket.emit("update inhand card", { code: this.lobbyCode, hand: this.handCard });
          }
          this.conditionCheck(x);
        }
      })
    } else {
      this.conditionCheck(this.decisionResult);
    }
  }
  conditionCheck(card: any) {
    switch (this.dc_condition) {
      case 'russianroulette':
        console.log(true);
        break;
      case 'coaching':
        console.log(true);
        break;
    }
    this.showDecisionTemplate = false;
    this.decisionResult = null;
    this.next_queue();
  }
  // openDecisionCard(data: {symbol?:any , code?:any}){ //store_condition ['and','or']
  //   this.api.openCard(this.roomcode).subscribe((card: any) => {
  //     let x = card;

  //     if(typeof(data.symbol) !== 'undefined'){
  //       if(typeof(data.code) !== 'undefined'){
  //         let c_check = false;
  //         let s_check = false;
  //         data.symbol.forEach((sb: any) => {
  //           if(x.symbol == sb){
  //             s_check = true;
  //           }
  //         });
  //         data.code.forEach((cd: any) => {
  //           if(x.code == cd){
  //             c_check = true;
  //           }
  //         });
  //         if(s_check && c_check){
  //           this.decisionResult = {result: 'both', cards: x};
  //         }else if(s_check && !c_check){
  //           this.decisionResult = {result: 'symbol', cards: x};
  //         }else if(!s_check && c_check){
  //           this.decisionResult = {result: 'code', cards: x};
  //         }else{
  //           this.decisionResult = {result: 'none', cards: x};
  //         }
  //       }else{
  //         let s_check = false;
  //         data.symbol.forEach((sb: any) => {
  //           if(x.symbol == sb){
  //             s_check = true;
  //           }
  //         });
  //         this.decisionResult = {result: s_check, cards: x};
  //       }
  //     }
  //     else if(typeof(data.code) !== 'undefined'){
  //       let c_check = false;
  //       data.code.forEach((cd: any) => {
  //         if (x.code == cd) {
  //           c_check = true;
  //         }
  //       });
  //       this.decisionResult = {result: c_check, cards: x};
  //     }
  //   })
  // }

  openChat() {
    this.showChat = !this.showChat
  }

  copyCodeToClipboard() {
    navigator.clipboard.writeText(this.roomcode);
    let a = this.elementRef.nativeElement.querySelector('.copy-noti');
    a.classList.remove('hidden');
    a.classList.add('visible');
    setTimeout(() => { a.classList.remove('visible'); a.classList.add('hidden'); }, 1000);

  }
  useCard() {
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
      console.log(data);
      this.testing = []
      data.forEach((d: any) => {
        this.testing.push(d.position)
        console.log(this.testing);
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

  flexAction(data: any) {
    switch (data) {
      case 'martin':
        this.effectCharacter = "มาติน สกอร์เปี้ยน"
        this.effectDescription = "จองหอง : ในขั้นตอนการเตรียมการของราชา สามารถจั่วการ์ดได้ 1 ใบ หากเลือกที่จะจั่วการ์ด ขีดจำกัดสูงสุดของการ์ดในมือราชาจะลดลง 1 ใบในรอบนี้้ "
        break;
      case 'merguin':
        this.effectCharacter = "เมอกวิ้น"
        this.effectDescription = "ศุนย์กลางของโลก : สามารถใช้สัญลักษณ์ของการ์ดบนมือ แทนผลการเปิดการ์ดตัดสินของทุกคนได้ (หลังจากนั้นให้ทิ้งการ์ดที่ถูกนำมาใช้) "
        break;
    }

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
      this.appendChat('<div class="w-100 pb-1 px-3"><div class="py-2 px-3" style="font-size:15px;border-radius: 20px;color: white;background-color:#9A20DD;max-width: fit-content; margin-left: auto;"><span style="overflow-wrap: break-word;">' + message + '</span></div>');
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


  // methodMatching: { [K: string]: Function} = {
  //   //character
  //   foxia: this.foxiaEffect,
  //   owliver: this.owliverEffect,
  //   bearyl: this.bearylEffect,
  //   snale: this.snaleEffect,
  //   porcky: this.porckyEffect,
  //   merguin: this.merguinEffect,

  //   martin: this.martinEffect,
  // };

  cardMethod(name: string) {
    switch (name) {
      //character
      case 'martin':
        this.martinEffect();
        break;
      case 'foxia':
        this.foxiaEffect();
        break;
      case 'owliver':
        this.owliverEffect();
        break;
      case 'bearyl':
        this.bearylEffect();
        break;

      //trick
      case 'russianroulette':
        this.russianrouletteEffect();
        break;
      case 'coaching':
        this.coachingEffect();
        break;
    }
  }
  //Character Effect Method

  vetarnEffect(): void {
    this.trickDistance = 10;
    //นิทานหลอกเด็ก : เมื่อใช้การ์ดอุบาย สามารถจั่วการ์ดได้ 1 ใบ
  }

  luckyGhostEffect(): void {
    this.trickDistance + 1;
    this.attackDistance + 1;
    //วัดใจ : เมื่อใช้การ์ดโจมตี ให้เปิดการ์ดตัดสิน 1 ใบ ถ้าเป็น ♥/♦ จะถือว่าสำเร็จ
  }
  ninjakappaEffect(): void {
    this.specialDefense = ['attack', 'defense'];
    this.specialAttack = ['attack', 'defense'];
  }

  witchEffect(): void {
    if (this.handCard.length == 0) {
      this.targetedDistance = 9999;
    }
    //หยั่งรู้ : ก่อนจั่วการ์ด สามารถเปิดดูการ์ดบนสุดของกองการ์ดได้ x ใบ (x เท่ากับจำนวนผู้เล่นทั้งหมดในเกมนั้น แต่ไม่เกิน 5 ใบ) แล้วจัดเรียงการ์ดเหล่านั้นใหม่ โดยนำการ์ดที่ต้องการ (กี่ใบก็ได้) ไว้ด้านบนสุดของกองการ์ด ที่เหลือไว้ใต้กอง
  }

  luciferEffect(): void {
    this.attackCount = 10
  }

  bloodyknightEffect(): void {
    this.specialAttack = ['heart', 'diamond'];
  }

  buta(): void {
    //สมบัตฺิผู้นำ : ระหว่างการจั่วการ์ด สามารถมอบการ์ดในมือให้กับผู้เล่นคนอื่นได้ หากมอบการ์ดตั้งแต่ 2 ใบขึ้นไป ในรอบนี้ฟื้นฟูพลังชีวิต 1 หน่วย
  }



  // in prepare stage can openDecisionCard if symbol is club/spade store it - openDecisionCard({symbol: ['club','spade'],store_by_decision: true})



  martinEffect() {
    let m = this.inGameChar.find(c => c.character.char_name == 'martin');
    this.socket.emit('trigger others effect', { code: this.roomcode, position: m.position, character: m.character.char_name });
  }

  foxiaEffect() {
    this.isFoxiaEffect = true;
    this.showDecisionTemplate = true;
    //this.specialDefense = ['club','spade'];
    // in prepare stage can openDecisionCard if symbol is club/spade store it - openDecisionCard({symbol: ['club','spade'],store_by_decision: true})
  }



  foxiaStore() {
    console.log(this.decisionResult.id);
    this.handCard.push(this.decisionResult);
    this.foxiaStoredCard.push(this.decisionResult.id);
    this.decisionResult = null;
    this.storeConfirm = false;
    this.socket.emit("update inhand card", { code: this.lobbyCode, hand: this.handCard });
  }

  foxiaCancel() {
    if (this.foxiaStoredCard.length > 0) {
      this.api.updateInUse(this.roomcode, this.foxiaStoredCard).subscribe((data: any) => {
        console.log(data);
      });
    }
    this.isFoxiaEffect = false;
    this.showDecisionTemplate = false;
    this.decisionResult = null;
    this.next_queue();
  }

  owliverEffect() {
    // in openDecisionCard stage can store that card - openDecisionCard({store: true})
    // when damaged draw 2 card and give it to other player [can store its]
  }

  bearylEffect() {
    // in draw stage if draw only 1 card, this round 'attack' and 'duel' deal +1 damage
  }

  snaleEffect() {
    // in draw stage if not draw, can steal 1 other player inhand-card [ 1 or 2 player]
  }

  porckyEffect() {
    // when damaged can openDecisionCard if not heart offender choose drop 2 card or get 1 damaged
  }

  merguinEffect() {
    let m = this.inGameChar.find(c => c.character.char_name == 'merguin');
    this.socket.emit('trigger others effect', { code: this.roomcode, position: m.position, character: m.character.char_name });
    // when damaged can steal 1 card from offender [in-hand or in equipment field]
    // every decide stage can use effect to use in-hand card to be the result, after that drop this card
  }

  sealgameshEffect() {
    // when damaged can get the card that damaged you
    // can request to other animal tribe to use defense card for you [can refuse]
  }

  // Trick Method
  russianrouletteEffect() {
    this.dc_condition = 'russianroulette';
    if (this.decisionResult != null) {
      this.openDecisionCard(false);
    }
    else {
      this.showDecisionTemplate = true;
    }
  }

  coachingEffect() {
    this.dc_condition = 'coaching';
    if (this.decisionResult != null) {
      this.openDecisionCard(false);
    }
    else {
      this.showDecisionTemplate = true;
    }
  }

}
