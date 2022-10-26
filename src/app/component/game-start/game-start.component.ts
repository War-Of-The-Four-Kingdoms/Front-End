import { Component, ElementRef, OnInit } from '@angular/core';
import { WebSocketService } from "../../services/web-socket.service";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
import { Queue } from 'queue-typescript';
import { query } from '@angular/animations';

@Component({
  selector: 'app-game-start',
  templateUrl: './game-start.component.html',
  styleUrls: ['./game-start.component.scss']
})
export class GameStartComponent implements OnInit {
  urls:any = "../assets/picture/card/"
  dropFire: boolean = false;
  turnChange: boolean = false;
  textTurn: any = "";
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
  role: any = "";
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
  defCard: any[] = [];
  test: any;
  img1: any;
  img2: any;
  img3: any;
  img4: any;
  img5: any;
  img6: any;
  cardShow: boolean = false;
  canUse: boolean = false;
  cardCheck: any;
  panel = { active: true, name: 'This is panel header 1', disabled: false };
  showChat: boolean = false;
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
  hp1: any;
  hp2: any;
  hp3: any;
  hp4: any;
  hp5: any;
  hp6: any;
  inGameChar: any[] = [];
  players: any;
  prepareQueue: any;
  decideQueue: any;
  drawQueue: any;
  playQueue: any;
  dropQueue: any;
  endQueue: any;
  currentQueue: any;
  showDecisionTemplate: boolean = false;
  showGiveCard: boolean = false;
  others: any;
  maxHp: any;
  confirmEffect: boolean = false;
  othersHandCard: any[] = [];
  legionTemp: boolean = false;
 //processing
  youLose: boolean = false;
  youWin: boolean = false;
  coma: boolean = false;
  rescue: boolean = false;
  healCard: any[] = [];
  healSelected: any[] = [];
  comaPlayer: any;
  incomingDamage: any;
  waitingDef: boolean = false;
  defUse: number = 1;
  defSelected: any[] = [];
  armorDef: boolean = true;
  showSelectDef: boolean = false;
  maxAttack: number = 1;
  attackCount: any = 0;
  legionDrop: boolean = false;
  waitingLegionDrop: boolean = false;
  drawAdjust: any;
  attackDistance: any = 1;
  trickDistance: any;
  enemyDistance: any[] = [];
  specialDefense: any;
  specialAttack: any;
  specialStage: any;
  decisionResult: any = null;
  dc_condition: any = null;
  myEquipment = { weapon: null, armor: null, mount1: null, mount2: null };
  otherEquipment = {
    chair1: { position: 0, weapon: { card: null, image: null }, armor: { card: null, image: null }, mount1: { card: null, image: null }, mount2: { card: null, image: null } },
    chair2: { position: 0, weapon: { card: null, image: null }, armor: { card: null, image: null }, mount1: { card: null, image: null }, mount2: { card: null, image: null } },
    chair3: { position: 0, weapon: { card: null, image: null }, armor: { card: null, image: null }, mount1: { card: null, image: null }, mount2: { card: null, image: null } },
    chair5: { position: 0, weapon: { card: null, image: null }, armor: { card: null, image: null }, mount1: { card: null, image: null }, mount2: { card: null, image: null } },
    chair6: { position: 0, weapon: { card: null, image: null }, armor: { card: null, image: null }, mount1: { card: null, image: null }, mount2: { card: null, image: null } }
  }
  myEquipmentImage = { weapon: null, armor: null, mount1: null, mount2: null };
  //dropcard
  selectedItems: any[] = [];
  showDropTemplate: boolean = false;

  //luckyghost
  luckyghostTarget: any = null;

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

  //puta
  putaGiveCount: any;

  //bearyl
  bearylDamageAdjust: number = 0;

  //snale
  stealCard: boolean = false;
  stealTargetSelected: any = null;
  stealCardShowNum: number = 0;
  stealablePlayers: any;

  stealCardSelected: any[] = [];
  canAttack: boolean = false;
  handing: any[] = [];
  activingCard: boolean = false;
  showingCard: any;
  waitingKingSelect: boolean = false;
  kingImage: any;
  foxiaLuck: any;


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
    let icon = this.elementRef.nativeElement.querySelector("#myh")
    // icon.classList.add("length5")
    console.log(icon);
    console.log('test');

    this.socket.listen('set decision result').subscribe((data: any) => {
      this.decisionResult = data.card;
    });
    this.socket.listen('random characters').subscribe((data: any) => {
      this.waitingKingSelect = false;
      this.characterCard = true;
      this.characterPool = data
      this.characterPool.forEach((c: any) => {
        if (c.image_name.startsWith("../assets/picture/card/")) {
          c.image_name = c.image_name
        } else {
          c.image_name = "../assets/picture/card/" + c.image_name
        }
      });
    });
    this.socket.listen('assign roles').subscribe((data: any) => {
      console.log(data);

      for (var i = 1; i < 7; i++) {
        if (!this.testing.includes(this.chairPos[i])) {
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
      this.king_uid = data.king.sid;
      this.role = data.me.role;
      switch (this.role) {
        case 'king':
          this.showRole = "../assets/picture/crowns.png"
          this.showText = "จงหาชาวบ้านและผู้ทรยศในหมู่พวกเราและสังหาร"
          break;
        case 'knight':
          this.showRole = "../assets/picture/knight.png"
          this.showText = "ร่วมมือกับราชาและสังหารผู้ปองร้าย"
          break;
        case 'noble':
          this.showRole = "../assets/picture/noble.png"
          this.showText = "จงสังหารผู้คนทั้งหมด"
          break;
        case 'villager':
          this.showRole = "../assets/picture/villager.png"
          this.showText = "จงสังหารราชา"
          break;
      }
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
    if (this.started) {
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
    this.socket.listen('get card from others').subscribe((data: any) => {
      this.test555 = true;
      this.showDraw = data.cards;
      setTimeout(() => {
        data.cards.forEach((card: any) => {
          this.test555 = false;
          this.showDraw = [];
          this.handCard.push(card);
        });
      }, 2500);
    });


    this.socket.listen('change stage').subscribe((data: any) => {
      this.closeAll();
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
              if (this.myCharacter.char_name == 'kraken') {
                this.drawAdjust++;
              }
              if (this.myCharacter.char_name == 'bearyl') {
                this.drawQueue.enqueue({ waiting: false, name: 'bearyl' });
              } else if (this.myCharacter.char_name == 'snale') {
                this.drawQueue.enqueue({ waiting: false, name: 'snale' });
              } else {
                this.drawQueue.enqueue({ waiting: false, name: 'draw' });
              }
              if (this.myCharacter.char_name == 'puta') {
                this.drawQueue.enqueue({ waiting: false, name: 'puta' });
              }
              this.turnChange = false
              this.drawStage();
            }, 2000);
            break;
          case 'play':
            this.textTurn = "ACTION PHARSE"
            this.attackCount = 0;
            this.turnChange = true
            setTimeout(() => {
              this.currentQueue = 'play';
              this.playQueue = new Queue<Object>();
              this.turnChange = false
              this.playStage();
            }, 2000);
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
      this.flexAction(this.myCharacter.char_name);
      this.showTrigger = true
      this.waiting = false

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
    this.socket.listen('you died').subscribe((data: any) => {
      this.coma = false;
      let handc: any[] = [];
      this.handCard.forEach(hc => {
        handc.push(hc.id)
      });
      if (this.myEquipment.weapon != null) {
        handc.push(this.myEquipment.weapon['id'])
      }
      if (this.myEquipment.armor != null) {
        handc.push(this.myEquipment.armor['id'])
      }
      if (this.myEquipment.mount1 != null) {
        handc.push(this.myEquipment.mount1['id'])
      }
      if (this.myEquipment.mount2 != null) {
        handc.push(this.myEquipment.mount2['id'])
      }
      this.api.dropCard(this.roomcode, handc).subscribe((data: any) => {
      });
      this.handCard = [];
      this.youLose = true;
    });
    this.socket.listen('player died').subscribe((data: any) => {
      this.quitRage.push(data.position)
      this.others = this.others.filter((o: any) => o.position != data.position);
      this.testing = this.testing.filter((t: any) => t != data.position);
      this.enemyDistance = []
      this.testing.forEach((d: any) => {
        if (this.chair1 == d) {
          if (this.testing.length <= 3) {
            this.enemyDistance.push({ position: d, distance: 1 })
          } else if (this.testing.length == 4) {
            if (this.testing.filter((dt: any) => dt == this.chair6 || dt == this.chair5).length == 2 || this.testing.filter((dt: any) => dt == this.chair2 || dt == this.chair3).length == 2) {
              this.enemyDistance.push({ position: d, distance: 1 })
            } else {
              this.enemyDistance.push({ position: d, distance: 2 })
            }
          }
          else if (this.testing.length == 5) {
            this.enemyDistance.push({ position: d, distance: 2 })
          }
          else if (this.testing.length == 6) {
            this.enemyDistance.push({ position: d, distance: 3 })
          } else {
            this.enemyDistance.push({ position: d, distance: 1 })
          }
          if (this.otherEquipment.chair1.mount1.card != null) {
            this.enemyDistance.find(e => e.position == d).distance += this.otherEquipment.chair1.mount1.card['distance']
          }
        } else if (this.chair2 == d) {
          if (this.testing.filter((dt: any) => dt == this.chair1 || dt == this.chair5 || dt == this.chair6).length >= 1) {
            if (this.testing.find((dt: any) => dt == this.chair3)) {
              this.enemyDistance.push({ position: d, distance: 2 })
            } else {
              this.enemyDistance.push({ position: d, distance: 1 })
            }
          } else {
            this.enemyDistance.push({ position: d, distance: 1 })
          }
          if (this.otherEquipment.chair2.mount1.card != null) {
            this.enemyDistance.find(e => e.position == d).distance += this.otherEquipment.chair2.mount1.card['distance']
          }
        } else if (this.chair3 == d) {
          this.enemyDistance.push({ position: d, distance: 1 })
          if (this.otherEquipment.chair3.mount1.card != null) {
            this.enemyDistance.find(e => e.position == d).distance += this.otherEquipment.chair3.mount1.card['distance']
          }
        } else if (this.chair5 == d) {
          this.enemyDistance.push({ position: d, distance: 1 })
          if (this.otherEquipment.chair5.mount1.card != null) {
            this.enemyDistance.find(e => e.position == d).distance += this.otherEquipment.chair5.mount1.card['distance']
          }
        }
        else if (this.chair6 == d) {
          if (this.testing.filter((dt: any) => dt == this.chair3 || dt == this.chair2 || dt == this.chair1).length >= 1) {
            if (this.testing.find((dt: any) => dt == this.chair5)) {
              this.enemyDistance.push({ position: d, distance: 2 })
            } else {
              this.enemyDistance.push({ position: d, distance: 1 })
            }
          } else {
            this.enemyDistance.push({ position: d, distance: 1 })
          }
          if (this.otherEquipment.chair6.mount2.card != null) {
            this.enemyDistance.find(e => e.position == d).distance += this.otherEquipment.chair6.mount1.card['distance']
          }
        }
      });
    })
    this.socket.listen('you win').subscribe((data: any) => {
      this.youWin = true;
      setTimeout(() => {
        window.location.href = '/';
      }, 5000);
    })
    this.socket.listen('you lose').subscribe((data: any) => {
      this.youLose = true;
      setTimeout(() => {
        window.location.href = '/';
      }, 5000);
    })
    this.socket.listen('legion dropped').subscribe((data: any) => {
      this.waitingLegionDrop = false;
    })
    this.socket.listen('waiting king select').subscribe((data: any) => {
      this.waitingKingSelect = true;
    })

    this.socket.listen('attacked').subscribe((data: any) => {
      if (this.myCharacter.char_name == 'foxia') {
        this.defCard = this.handCard.filter(hc => hc.info.item_name == 'defense' || hc.info.symbol == 'spade' || hc.info.symbol == 'club');
      } else if (this.myCharacter.char_name == 'ninjakappa') {
        this.defCard = this.handCard.filter(hc => hc.info.item_name == 'defense' || hc.info.item_name == 'attack');
      } else {
        this.defCard = this.handCard.filter(hc => hc.info.item_name == 'defense');
      }

      if (data.extra_def) {
        this.defUse = 2;
      }
      if (data.ignore_armor) {
        this.armorDef = false;
      }
      this.incomingDamage = data.damage;
      this.showSelectDef = true;
    });
    this.socket.listen('damaged').subscribe((data: any) => {
      for (let i = 0; i < data.damage; i++) {
        this.hp4.splice(-1)
      }
      this.life4 -= data.damage;
      this.socket.emit('update hp', { code: this.roomcode, hp: this.life4 });
      if(data.legion){
        this.legionDrop = true;
        this.showDropTemplate = true;
      }
    });
    this.socket.listen('update remain hp').subscribe((data: any) => {

      if (this.chair1 == data.position) {
        this.updateHp(this.hp1, data.hp - this.life1);
        this.life1 = data.hp
      } else if (this.chair2 == data.position) {
        this.updateHp(this.hp2, data.hp - this.life2);
        this.life2 = data.hp
      } else if (this.chair3 == data.position) {
        this.updateHp(this.hp3, data.hp - this.life3);
        this.life3 = data.hp
      } else if (this.chair5 == data.position) {
        this.updateHp(this.hp5, data.hp - this.life5);
        this.life5 = data.hp
      } else if (this.chair6 == data.position) {
        this.updateHp(this.hp6, data.hp - this.life6);
        this.life6 = data.hp
      }
    });

    this.socket.emit('get room info', { code: this.roomcode, max_player: this.roomMAX, username: sessionStorage.getItem('username'), private: this.is_private });
    this.socket.listen('need more player').subscribe(() => {
      this.started = false
      alert('This game require atleast 4 players.')
    });
    this.socket.listen('update inhand').subscribe((data: any) => {
      if (data.position != this.myPos) {
        this.chairPos.forEach((element, i) => {
          if (this.chairPos[i] == data.position) {
            this.handing[i] = data.card_num
          }
        });
        this.others.find((o: any) => o.position == data.position).in_hand = data.card_num;
      }
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
      this.myPosId = room.sid;
      this.roomHost = room.host
      this.is_private = room.private;
      sessionStorage.setItem('private', room.private);
      if (room.is_host == true) {
        this.host = true
      } else {
        room.players.forEach((d: any) => {
          if (this.chair1 == d.position) {
            this.chair1user = true
            if (d.sid == this.roomHost) {
              this.hosting1 = true
            }
          } else if (this.chair2 == d.position) {
            this.chair2user = true
            if (d.sid == this.roomHost) {
              this.hosting2 = true
            }
          } else if (this.chair3 == d.position) {
            this.chair3user = true
            if (d.sid == this.roomHost) {
              this.hosting3 = true
            }
          } else if (this.chair4 == d.position) {
            this.chair4user = true
            if (d.sid == this.roomHost) {
              this.hosting4 = true
            }
          } else if (this.chair5 == d.position) {
            this.chair5user = true
            if (d.sid == this.roomHost) {
              this.hosting5 = true
            }
          }
          else if (this.chair6 == d.position) {
            this.chair6user = true
            if (d.sid == this.roomHost) {
              this.hosting6 = true
            }
          }
        });
      }

    });
    this.socket.listen('change host').subscribe((sid: any) => {
      this.roomHost = sid.host
      this.hosting1 = false
      this.hosting2 = false
      this.hosting3 = false
      this.hosting4 = false
      this.hosting5 = false
      this.hosting6 = false
      if (this.myPosId == sid.host) {
        this.host = true
        this.hosting4 = true
      } else {
        this.host = false
        sid.players.forEach((d: any) => {
          if (this.chair1 == d.position) {
            this.chair1user = true
            if (d.sid == sid.host) {
              this.hosting1 = true
            }
          } else if (this.chair2 == d.position) {
            this.chair2user = true
            if (d.sid == sid.host) {
              this.hosting2 = true
            }
          } else if (this.chair3 == d.position) {
            this.chair3user = true
            if (d.sid == sid.host) {
              this.hosting3 = true
            }
          } else if (this.chair4 == d.position) {
            this.chair4user = true
            if (d.sid == sid.host) {
              this.hosting4 = true
            }
          } else if (this.chair5 == d.position) {
            this.chair5user = true
            if (d.sid == sid.host) {
              this.hosting5 = true
            }
          }
          else if (this.chair6 == d.position) {
            this.chair6user = true
            if (d.sid == sid.host) {
              this.hosting6 = true
            }
          }
        });
      }
    });

    this.socket.listen('card stolen').subscribe((data: any) => {
      data.cards.forEach((card: any) => {
        this.handCard = this.handCard.filter(hc => hc.id != card.id);
      });
    });
    this.socket.listen('coma').subscribe((data: any) => {
      this.coma = true;
    });
    this.socket.listen('rescue coma').subscribe((data: any) => {
      if (this.myCharacter.char_name == 'nightingale') {
        this.healCard = this.handCard.filter(hc => hc.info.item_name == 'heal' || hc.info.symbol == 'spade' || hc.info.symbol == 'club');
      } else {
        this.healCard = this.handCard.filter(hc => hc.info.item_name == 'heal');
      }
      this.comaPlayer = this.others.find((o:any) => o.position == data.position);
      this.rescue = true;
    });
    this.socket.listen('coma rescued').subscribe((data: any) => {
      if (data.position == this.myPos) {
        this.coma = false;
        this.hp4.push(0);
      } else {
        this.healCard = [];
        this.healSelected = [];
        this.comaPlayer = null;
        this.rescue = false;
      }
    });
    this.socket.listen('player leave').subscribe((data: any) => {
      this.quitRage.push(data.position)
    });
    this.socket.listen('waiting other select character').subscribe((data: any) => {
      this.characterCard = false;
    });
    this.socket.listen('increase enemy distance').subscribe((data: any) => {
      console.log(this.enemyDistance);
      console.log(data);
      this.enemyDistance.find(e => e.position == data.position).distance += data.distance

    });
    this.socket.listen('attack success').subscribe((data: any) => {
      console.log(data);

      if (data.legion) {
        console.log('life4 ' + this.life4);
        console.log(this.maxHp);

        if (this.life4 < this.maxHp) {
          this.life4 += 1;
          this.updateHp(this.hp4, 1);
          this.socket.emit('update hp', { code: this.roomcode, hp: this.life4 });
        } else {
          this.api.drawCard(this.roomcode, 1).subscribe((data: any) => {
            this.test555 = true
            this.showDraw = data
            setTimeout(() => {
              data.forEach((card: any) => {
                this.handCard.push(card);
              });
              this.test555 = false
              this.showDraw = [];
              this.socket.emit("update inhand card", { code: this.lobbyCode, hand: this.handCard });
            }, 2500);
          });
        }
      }
      this.waitingDef = false;
      if(this.myCharacter.char_name == 'legioncommander'){
        this.waitingLegionDrop = true;
      }
    });
    this.socket.listen('attack fail').subscribe((data: any) => {
      this.waitingDef = false;
    });
    this.socket.listen('change equipment image').subscribe((data: any) => {
      if (this.otherEquipment.chair1.position == data.position) {
        this.setItem(data.type, data.card, this.otherEquipment.chair1);
      } else if (this.otherEquipment.chair2.position == data.position) {
        this.setItem(data.type, data.card, this.otherEquipment.chair2);
      } else if (this.otherEquipment.chair3.position == data.position) {
        this.setItem(data.type, data.card, this.otherEquipment.chair3);
      }
      else if (this.otherEquipment.chair5.position == data.position) {
        this.setItem(data.type, data.card, this.otherEquipment.chair5);
      }
      else if (this.otherEquipment.chair6.position == data.position) {
        this.setItem(data.type, data.card, this.otherEquipment.chair6);
      }
    });


    this.socket.listen('ready to start').subscribe((data: any) => {


      this.otherEquipment.chair1.position = this.chair1;
      this.otherEquipment.chair2.position = this.chair2;
      this.otherEquipment.chair3.position = this.chair3;
      this.otherEquipment.chair5.position = this.chair5;
      this.otherEquipment.chair6.position = this.chair6;
      this.api.drawCard(this.roomcode, 4).subscribe((data: any) => {
        this.test555 = true
        this.showDraw = data
        setTimeout(() => {
          this.handCard = data;
          this.test555 = false
          this.showDraw = [];
          this.socket.emit('draw card', { hand: this.handCard, code: this.roomcode });
        }, 2500);
      });
      this.characterCard = false;
      data.forEach((pos: any) => {

        if (this.others.find((o: any) => o.position == pos)) {
          let other = this.others.find((o: any) => o.position == pos);
          other.in_hand = 4;
          other.equiped = 0;
          other.dead = false;
          for (var i = 1; i < 7; i++) {
            this.handing[i] = 4
          }
        }
      });


    });

    this.socket.listen('set player info').subscribe((data: any) => {
      this.players = data.players;
      this.others = data.players.filter((p: any) => p.id != this.myPosId);
    });

    this.socket.listen('set player character').subscribe((data: any) => {
      console.log(data);
      this.inGameChar.push(data);
      if (this.myPos == data.position) {
        this.test = "../assets/picture/card/" + data.character.image_name
        this.life4 = data.remain_hp
        this.hp4 = Array.from(Array(this.life4).keys())
        let icon = this.elementRef.nativeElement.querySelector("#myh")
        icon.classList.add("length" + data.remain_hp)
        console.log(icon);
        if (this.myPos == this.king_pos) {
          this.kingImage = this.test
        }
      } else {
        if (this.chair1 == data.position) {
          this.img1 = "../assets/picture/card/" + data.character.image_name
          this.life1 = data.remain_hp
          this.hp1 = Array.from(Array(this.life1).keys())
          let icon = this.elementRef.nativeElement.querySelector("#myh1")
          icon.classList.add("lengths" + data.remain_hp)
          if (this.chair1 == this.king_pos) {
            this.kingImage = this.img1
          }
        } else if (this.chair2 == data.position) {
          this.img2 = "../assets/picture/card/" + data.character.image_name
          this.life2 = data.remain_hp
          this.hp2 = Array.from(Array(this.life2).keys())
          let icon = this.elementRef.nativeElement.querySelector("#myh2")
          icon.classList.add("lengths" + data.remain_hp)
          if (this.chair2 == this.king_pos) {
            this.kingImage = this.img2
          }
        } else if (this.chair3 == data.position) {
          this.img3 = "../assets/picture/card/" + data.character.image_name
          this.life3 = data.remain_hp
          this.hp3 = Array.from(Array(this.life3).keys())
          let icon = this.elementRef.nativeElement.querySelector("#myh3")
          icon.classList.add("lengths" + data.remain_hp)
          if (this.chair3 == this.king_pos) {
            this.kingImage = this.img3
          }
        } else if (this.chair4 == data.position) {
          this.img4 = "../assets/picture/card/" + data.character.image_name
          this.life4 = data.remain_hp
          this.hp4 = Array.from(Array(this.life4).keys())
          let icon = this.elementRef.nativeElement.querySelector("#myh4")
          icon.classList.add("lengths" + data.remain_hp)
          if (this.chair4 == this.king_pos) {
            this.kingImage = this.img4
          }
        }
        else if (this.chair5 == data.position) {
          this.img5 = "../assets/picture/card/" + data.character.image_name
          this.life5 = data.remain_hp
          this.hp5 = Array.from(Array(this.life5).keys())
          let icon = this.elementRef.nativeElement.querySelector("#myh5")
          icon.classList.add("lengths" + data.remain_hp)
          if (this.chair5 == this.king_pos) {
            this.kingImage = this.img5
          }
        }
        else if (this.chair6 == data.position) {
          this.img6 = "../assets/picture/card/" + data.character.image_name
          this.life6 = data.remain_hp
          this.hp6 = Array.from(Array(this.life6).keys())
          let icon = this.elementRef.nativeElement.querySelector("#myh6")
          icon.classList.add("lengths" + data.remain_hp)
          if (this.chair6 == this.king_pos) {
            this.kingImage = this.img6
          }
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
  updateHp(arr: any[], hp: any) {

    if (hp < 0) {
      for (let i = 0; i < Math.abs(hp); i++) {
        arr.splice(-1)
      }
    } else {
      for (let i = 0; i < hp; i++) {
        arr.push(0);
      }
    }

  }



  setItem(type: any, card: any, object: any) {
    switch (type) {
      case 'weapon':
        object.weapon.card = card;
        object.weapon.image = card.image;
        break;
      case 'armor':
        object.armor.card = card;
        object.armor.image = card.image;
        break;
      case 'mount1':
        object.mount1.card = card;
        object.mount1.image = card.image;
        break;
      case 'mount2':
        object.mount2.card = card;
        object.mount2.image = card.image;
        break;
    }
  }

  closeAll() {
    for (var b = 1; b < 7; b++) {
      if (this.testing.includes(this.chairPos[b]) && this.chairPos[b] != this.myPos) {
        let icon = this.elementRef.nativeElement.querySelector("#chairpvp" + String(b))
        icon.className = 'none';
      }
    }
    this.canAttack = false;
    this.cardShow = false;
    this.showGiveCard = false;
    this.showDecisionTemplate = false;
    this.confirmEffect = false;
    this.showDropTemplate = false;
    this.storeConfirm = false;
    this.showTrigger = false;
    this.isFoxiaEffect = false;
    this.merguinSelection = false;
    this.stealCard = false;
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

  showCarding(data:any){
    console.log(data);
    return "../assets/picture/cover.png"
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
            this.test555 = true
            this.showDraw = data
            setTimeout(() => {
              data.forEach((card: any) => {
                console.log(card);
                this.handCard.push(card);
                this.test555 = false
                this.showDraw = [];
              });
              this.socket.emit("update inhand card", { code: this.lobbyCode, hand: this.handCard });
              this.next_queue();
            }, 2500);
          });

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
        if (q.name == 'attack') {
          this.openDecisionCard(false);
        } else {
          this.cardMethod(q.name);
        }
      }
    } else {
      // clearInterval(this.interval);
      // this.socket.emit('end stage', { code: this.lobbyCode });
    }
    console.log(this.enemyDistance);

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

  cancelEffect() {
    this.drawQueue.enqueue({ waiting: false, name: 'draw' });
    this.confirmEffect = false;
    this.next_queue();
  }

  showDrop() {
    this.showDropTemplate = !this.showDropTemplate;
  }
  showGive() {
    this.showGiveCard = !this.showGiveCard;
  }
  checkedState(event: any) {
    let dropnum: any = 0;
    this.legionDrop ? dropnum = 1 : dropnum = this.handCard.length - this.life4; ;
    if (event.target.checked === true) {
      if (this.selectedItems.length < dropnum) {
        this.selectedItems.push(event.target.value)
      } else {
        event.target.checked = false;
      }
    } else {
      this.selectedItems = this.selectedItems.filter(dc => dc != event.target.value)
    }
    this.dropCard = this.selectedItems

  }
  checkedHeal(event: any) {
    if (event.target.checked === true) {
      if (this.healSelected.length < 1) {
        this.healSelected.push(event.target.value)
      } else {
        event.target.checked = false;
      }
    } else {
      this.healSelected = this.healSelected.filter(hs => hs != event.target.value)
    }
  }
  confirmRescue() {
    if (this.healSelected.length == 1) {
      this.healSelected.forEach(ds => {
        this.handCard = this.handCard.filter(hc => hc.id != ds)
      });
      this.socket.emit("update inhand card", { code: this.roomcode, hand: this.handCard });
      this.api.dropCard(this.roomcode, this.healSelected).subscribe((data: any) => {
      });
      this.socket.emit('rescue coma', { code: this.roomcode, target: this.comaPlayer.position });
      this.healCard = [];
      this.healSelected = [];
      this.rescue = false;
    } else {
      alert('กรุณาเลือกการ์ดฟื้นฟู 1 ใบ');
    }
  }
  ignoreRescue() {
    this.socket.emit('ignore coma', { code: this.roomcode, target: this.comaPlayer.position });
    this.healCard = [];
    this.healSelected = [];
    this.rescue = false;
  }
  checkedGive(event: any) {
    if (event.target.checked === true) {
      this.selectedItems.push(event.target.value)
    } else {
      this.selectedItems = this.selectedItems.filter(dc => dc != event.target.value)
    }
  }
  checkedSteal(event: any) {
    if (event.target.checked === true) {
      if (this.stealCardSelected.find((scs: any) => scs.uuid == event.target.value)) {
        event.target.checked = false;
      } else if (this.stealTargetSelected != null) {
        let a = this.elementRef.nativeElement.querySelectorAll('input#p' + this.stealTargetSelected + ':checked');
        a.forEach((element: any) => {
          element.checked = false;
        });
        this.stealTargetSelected = event.target.value;
        this.stealCardShowNum = this.others.find((o: any) => o.uuid == event.target.value).in_hand;
      } else {
        this.stealTargetSelected = event.target.value;
        this.stealCardShowNum = this.others.find((o: any) => o.uuid == event.target.value).in_hand;
      }
    } else {
      this.stealTargetSelected = null;
      this.stealCardShowNum = 0;
    }
  }
  checkedDef(event: any) {
    if (event.target.checked === true) {
      if (this.defSelected.length < this.defUse) {
        this.defSelected.push(event.target.value)
      } else {
        event.target.checked = false;
      }
    } else {
      this.defSelected = this.defSelected.filter(ds => ds != event.target.value)
    }
  }
  useDef() {
    if (this.defSelected.length == this.defUse) {
      this.defSelected.forEach(ds => {
        this.handCard = this.handCard.filter(hc => hc.id != ds)
      });
      this.socket.emit("update inhand card", { code: this.lobbyCode, hand: this.handCard });
      this.api.dropCard(this.roomcode, this.defSelected).subscribe((data: any) => {
      });
      this.socket.emit('use defense', { code: this.roomcode, canDef: true, damage: this.incomingDamage });
      this.defSelected = [];
      this.incomingDamage = 0;
      this.showSelectDef = false;
    } else {
      alert('กรุณาเลือกการ์ดป้องกันจำนวน ' + this.defUse + ' ใบ');
    }
  }
  noDef() {
    this.socket.emit('use defense', { code: this.roomcode, canDef: false, damage: this.incomingDamage });
    this.incomingDamage = 0;
    this.showSelectDef = false;
  }
  useCharDef() {

  }
  useArmorDef() {

  }
  giveCardToPlayer(uuid: any) {
    if (this.selectedItems.length == 0) {
      alert('กรุณาเลือกการ์ดอย่างน้อย 1 ใบ');
    } else {
      this.putaGiveCount += this.selectedItems.length;
      if (this.selectedItems.length == this.handCard.length) {
        this.putaFinish();
      }
      this.selectedItems.forEach(card_id => {
        this.handCard = this.handCard.filter(hc => hc.id != card_id);
      });
      this.socket.emit('give card to others', { code: this.roomcode, cards: this.selectedItems, target: uuid });
      this.selectedItems = [];
    }
  }

  putaFinish() {
    if (this.putaGiveCount >= 2 && this.life4 < this.maxHp) {
      this.life4 += 1;
      this.updateHp(this.hp4, 1);
    }
    this.selectedItems = [];
    this.showGiveCard = false;
    this.next_queue();
  }
  stealCardIndex(index: any) {
    this.stealCardSelected.push({ uuid: this.stealTargetSelected, index: index })
    let a = this.elementRef.nativeElement.querySelectorAll('input#p' + this.stealTargetSelected + ':checked');
    a.forEach((element: any) => {
      element.checked = false;
    });
    this.stealablePlayers.find((sp: any) => sp.uuid == this.stealTargetSelected).stealed = true;
    this.stealTargetSelected = null
    this.stealCardShowNum = 0;
    if (this.stealCardSelected.length >= 2) {
      this.snaleFinish();
    }
  }
  snaleFinish() {
    this.stealCard = false;
    this.stealablePlayers = null;
    if (this.stealCardSelected.length > 0) {
      this.socket.emit('steal other player card', { code: this.roomcode, selected: this.stealCardSelected });
      this.stealCardSelected = [];
      setTimeout(() => {
        this.next_queue();
      }, 4000);
    } else {
      this.next_queue();
    }
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
    });
    this.selectedItems = [];
    this.socket.emit('special effect end', { code: this.roomcode });
    this.merguinSelection = false;
  }

  dropSelectedCard() {
    let dropnum: any = 0;
    this.legionDrop ? dropnum = 1 : dropnum = this.handCard.length - this.life4
    if (this.selectedItems.length != dropnum) {
      alert('เลือกการ์ดอีก ' + ((this.handCard.length - this.life4) - this.selectedItems.length) + ' ใบ')
    } else {
      this.dropFire = true
      setTimeout(() => {
        this.dropFire = false
        this.selectedItems.forEach(item => {
          this.handCard = this.handCard.filter(hc => hc.id != item)
        });
        this.socket.emit("update inhand card", { code: this.lobbyCode, hand: this.handCard });
        this.api.dropCard(this.roomcode, this.selectedItems).subscribe((data: any) => {
          this.dropCard = data
        });
        this.showDropTemplate = false;
        this.selectedItems = [];
        if(this.legionDrop){
          this.socket.emit("legion drop done", { code: this.roomcode});
          this.legionDrop = false;
        }else{
          this.next_queue();
        }
      }, 2000);
    }

  }

  prepareStage() {
    if (this.prepareQueue.length > 0) {
      let q = this.prepareQueue.dequeue();
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
  cancelSpecialEffect() {
    this.socket.emit('special effect end', { code: this.roomcode });
    this.showTrigger = false
  }
  specialEffect() {
    if (this.myCharacter.char_name == 'martin') {
      this.api.drawCard(this.roomcode, 1).subscribe((data: any) => {
        //effect
        this.test555 = true
        this.showDraw = data
        setTimeout(() => {
          data.forEach((card: any) => {
            this.handCard.push(card);
            this.test555 = false
            this.showDraw = [];
          });
          this.socket.emit("update inhand card", { code: this.lobbyCode, hand: this.handCard });
        }, 2500);
      });
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

  cardEffect(card: any) {
    if (this.myPos == this.queue && this.currentQueue == 'play') {
      if (card.info.item_name == 'attack' && this.attackCount < this.maxAttack) {
        return true;
      } else if (card.info.item_name == 'heal' && this.life4 < this.maxHp) {
        return true;
      } else if (card.info.type == "trick" || card.info.type == "equipment") {
        return true;
      } else {
        return false;
      }
    } else {
      return false
    }
  }


  showCard(card: any) {
    for (var b = 1; b < 7; b++) {
      if (this.testing.includes(this.chairPos[b]) && this.chairPos[b] != this.myPos) {
        let icon = this.elementRef.nativeElement.querySelector("#chairpvp" + String(b))
        icon.className = 'none';
      }
    }
    this.canUse = false;
    this.cardCheck = card
    if (this.myPos == this.queue && this.currentQueue == 'play') {
      switch (card.info.type) {
        case 'active':
          if (card.info.item_name == 'attack' && this.attackCount < this.maxAttack) {
            this.canUse = true;
          } else if (card.info.item_name == 'heal' && this.life4 < this.maxHp) {
            this.canUse = true;
          }
          break;
        case 'trick':
          this.canUse = true;
          break;
        case 'equipment':
          this.canUse = true;
          break;
      }
    }
    this.cardShow = true;
  }

  cancelShow() {
    for (var b = 1; b < 7; b++) {
      if (this.testing.includes(this.chairPos[b]) && this.chairPos[b] != this.myPos) {
        let icon = this.elementRef.nativeElement.querySelector("#chairpvp" + String(b))
        icon.className = 'none';
      }
    }
    this.cardCheck = null;
    this.canUse = false;
    this.cardShow = false
  }

  openDecisionCard(is_draw: boolean) {
    if (is_draw) {
      this.api.openCard(this.roomcode).subscribe((card: any) => {
        this.foxiaLuck = card
        let x = card;
        if (this.myCharacter.char_name == 'foxia') {
          let symbols = ['club', 'spade'];
          let s_check = false;
          symbols.forEach((sb: any) => {
            if (x.info.symbol == sb) {
              s_check = true;
            }
          });
          this.decisionResult = x;
          if (s_check) {
            setTimeout(() => { this.storeConfirm = true; }, 3000);

          } else {
            setTimeout(() => { this.foxiaCancel() }, 3000);
          }
        } else {
          if (this.myCharacter.char_name == 'owliver') {
            this.handCard.push(x);
            this.api.updateInUse(this.roomcode, [x.id]).subscribe((data: any) => {
            });
            this.socket.emit("update inhand card", { code: this.lobbyCode, hand: this.handCard });
          }
          this.decisionResult = x;
          setTimeout(() => { this.conditionCheck(this.decisionResult); }, 3000);
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
      case 'luckyghost':
        let symbols = ['diamond', 'heart'];
        let s_check = false;
        symbols.forEach((sb: any) => {
          if (card.info.symbol == sb) {
            s_check = true;
          }
        });
        if (s_check) {
          this.api.dropCard(this.roomcode, [this.cardCheck.id]).subscribe((data: any) => {
          });
          this.socket.emit('force attack',{code: this.roomcode,target: this.luckyghostTarget, damage: this.damage(), card: this.cardCheck , legion: false});
        } else {
          this.waitingDef = true;
          this.api.dropCard(this.roomcode, [this.cardCheck.id]).subscribe((data: any) => {
          });
          this.socket.emit('use attack',{code: this.roomcode,target: this.luckyghostTarget, damage: this.damage(), card: this.cardCheck , legion: false});
        }
        this.luckyghostTarget = null;
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

  // this.handCard.forEach(element => {

  // });
  // const index = this.handCard.indexOf(this.cardCheck.id);
  // this.handCard.splice(index);
  // this.cardShow = false


  cfKill(data: any) {
    this.attackCount++;
    this.handCard = this.handCard.filter(hc => hc.id != this.cardCheck.id);
    this.socket.emit("update inhand card", { code: this.lobbyCode, hand: this.handCard });
    this.cardShow = false
    this.canAttack = false
    for (var b = 1; b < 7; b++) {
      if (this.testing.includes(this.chairPos[b]) && this.chairPos[b] != this.myPos) {
        let icon = this.elementRef.nativeElement.querySelector("#chairpvp" + String(b))
        icon.className = 'none';
      }
    }
    if (this.myCharacter.char_name == 'luckyghost') {
      this.luckyghostTarget = data;
      this.dc_condition = 'luckyghost';
      if (this.inGameChar.find(c => c.character.char_name == 'merguin')) {
        this.flexAction('merguin');
        this.waiting = true
        this.showTrigger = true
        this.cardMethod('merguin');
        this.playQueue.push({ waiting: false, name: 'attack' })
      } else {
        this.showDecisionTemplate = true
      }
    } else {
      this.waitingDef = true;
      this.api.dropCard(this.roomcode, [this.cardCheck.id]).subscribe((data: any) => {
      });
      if(this.myCharacter.char_name == 'legioncommander'){
        this.socket.emit('use attack',{code: this.roomcode,target: data,damage: this.damage(), card: this.cardCheck , legion: true});
      }else{
        this.socket.emit('use attack',{code: this.roomcode,target: data,damage: this.damage(), card: this.cardCheck , legion: false});
      }
    }

  }

  damage() {
    return 1 + this.bearylDamageAdjust;
  }

  activateMoon(data: any) {
    this.activingCard = !this.activingCard;
    if(data != null){
    if (data.startsWith("../assets/picture/card/")) {
      data = data
    } else {
      data = "../assets/picture/card/" + data
    }
  }
    this.showingCard = data
    console.log(this.activingCard);

  }

  useCard() {
    let cardInfo = this.cardCheck.info;
    let change = false;
    let oldEquipment: any = null;
    if (cardInfo.type == 'equipment') {
      switch (cardInfo.equipment_type) {
        case 'weapon':
          if (this.myEquipment.weapon == null) {
            this.myEquipment.weapon = this.cardCheck;
            this.myEquipmentImage.weapon = this.urls+cardInfo.image;
            this.attackDistance += cardInfo.distance;
          } else {
            change = true;
            oldEquipment = this.myEquipment.weapon;
            this.attackDistance -= oldEquipment.info.distance;
            this.myEquipment.weapon = this.cardCheck;
            this.myEquipmentImage.weapon = this.urls+cardInfo.image;
            this.attackDistance += cardInfo.distance;
          }
          if (cardInfo.item_name == 'wooden_club') {
            this.maxAttack = 100;
          }
          break;
        case 'armor':
          if (this.myEquipment.armor == null) {
            this.myEquipment.armor = this.cardCheck;
            this.myEquipmentImage.armor = this.urls+cardInfo.image;
          } else {
            change = true;
            oldEquipment = this.myEquipment.armor;
            this.myEquipment.armor = this.cardCheck;
            this.myEquipmentImage.armor = this.urls+cardInfo.image;
          }
          break;
        case 'mount':
          if (cardInfo.distance == 1) {
            if (this.myEquipment.mount1 == null) {
              this.myEquipment.mount1 = this.cardCheck;
              this.myEquipmentImage.mount1 = this.urls+cardInfo.image;
            } else {
              change = true;
              oldEquipment = this.myEquipment.mount1;
              this.myEquipment.mount1 = this.cardCheck;
              this.myEquipmentImage.mount1 = this.urls+cardInfo.image;
            }

          } else {
            if (this.myEquipment.mount2 == null) {
              this.myEquipment.mount2 = this.cardCheck;
              this.myEquipmentImage.mount2 = this.urls+cardInfo.image;
              this.attackDistance -= cardInfo.distance;
            } else {
              change = true;
              oldEquipment = this.myEquipment.mount2;
              this.attackDistance -= oldEquipment.info.distance;
              this.myEquipment.mount2 = this.cardCheck;
              this.myEquipmentImage.mount2 = this.urls+cardInfo.image;
              this.attackDistance -= cardInfo.distance;
              //attackDistance +
            }
          }
          break;
      }
      if (oldEquipment != null) {
        this.api.dropCard(this.roomcode, [oldEquipment.id]).subscribe((data: any) => {
          this.dropCard = data
        });
      }
      this.socket.emit('change equipment', { code: this.roomcode, card: this.cardCheck });
      this.handCard = this.handCard.filter(hc => hc.id != this.cardCheck.id);
      this.socket.emit("update inhand card", { code: this.lobbyCode, hand: this.handCard });
      this.cardShow = false
    }
    else if (cardInfo.item_name == "attack") {
      this.canAttack = true
      let martin = false;

      if (this.inGameChar.find(c => c.character.char_name == 'martin') && this.myCharacter.char_name != 'martin') {
        let martin_pos = this.inGameChar.find(c => c.character.char_name == 'martin').position;
        if (this.enemyDistance.find(e => e.position == martin_pos).distance <= this.attackDistance) {
          for (var b = 1; b < 7; b++) {
            if (this.chairPos[b] == martin_pos) {
              let hp = 0;
              let armor: any = null;
              switch (b) {
                case 1:
                  hp = this.life1;
                  armor = this.otherEquipment.chair1.armor.card;
                  break;
                case 2:
                  hp = this.life2;
                  armor = this.otherEquipment.chair2.armor.card;
                  break;
                case 3:
                  hp = this.life3;
                  armor = this.otherEquipment.chair3.armor.card;
                  break;
                case 5:
                  hp = this.life5;
                  armor = this.otherEquipment.chair5.armor.card;
                  break;
                case 6:
                  hp = this.life6;
                  armor = this.otherEquipment.chair6.armor.card;
                  break;
              }
              if (this.others.find((o: any) => o.position == martin_pos).in_hand > hp) {
                if ((this.myEquipment.weapon != null && this.myEquipment.weapon['item_name'] == 'shield_breaker') || armor == null || armor.item_name != 'frying_pan' || (this.cardCheck.info.symbol != 'spade' && this.cardCheck.info.symbol != 'club')) {
                  let icon = this.elementRef.nativeElement.querySelector("#chairpvp" + String(b))
                  icon.classList.remove("none")
                  icon.classList.add("pvp" + b)
                  martin = true;
                }
              }
            }
          }
        }
      }
      if (!martin) {
        for (var b = 1; b < 7; b++) {
          let armor: any = null;
          switch (b) {
            case 1:
              armor = this.otherEquipment.chair1.armor.card;
              break;
            case 2:
              armor = this.otherEquipment.chair2.armor.card;
              break;
            case 3:
              armor = this.otherEquipment.chair3.armor.card;
              break;
            case 5:
              armor = this.otherEquipment.chair5.armor.card;
              break;
            case 6:
              armor = this.otherEquipment.chair6.armor.card;
              break;
          }
          if (this.testing.includes(this.chairPos[b]) && this.chairPos[b] != this.myPos) {
            if ((this.myEquipment.weapon != null && this.myEquipment.weapon['item_name'] == 'shield_breaker') || armor == null || armor.item_name != 'frying_pan' || (this.cardCheck.info.symbol != 'spade' && this.cardCheck.info.symbol != 'club')) {
              let icon = this.elementRef.nativeElement.querySelector("#chairpvp" + String(b))
              if (this.attackDistance >= this.enemyDistance.find(e => e.position == this.chairPos[b]).distance) {
                icon.classList.remove("none")
                icon.classList.add("pvp" + b)
              }
            }
          }
        }
      }
    }else if (cardInfo.item_name == "heal") {
      if(this.life4 < this.maxHp){
        this.life4 += 1;
        this.hp4.push(0);
        this.socket.emit('update hp', { code: this.roomcode, hp: this.life4 });
        this.handCard = this.handCard.filter(hc => hc.id != this.cardCheck.id);
        this.socket.emit("update inhand card", { code: this.lobbyCode, hand: this.handCard });
        this.cardShow = false
      }else{
        alert('เลือดคุณเต็มแล้ว')
      }
    }
  }

  selectCharacter(char: any) {
    if(this.role == 'king'){
      this.socket.emit('king selected', { cid: char.id, code: this.roomcode });
    }else{
      this.socket.emit('character selected', { cid: char.id, code: this.roomcode });
    }
    this.myCharacter = char
    this.maxHp = char.hp + (this.extra_hp != undefined ? this.extra_hp : 0);
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
      this.testing = []
      this.enemyDistance = []

      data.forEach((d: any) => {
        this.testing.push(d.position)
        if (this.chair1 == d.position) {
          this.chair1user = true
          if (data.length == 4) {
            if (data.filter((dt: any) => dt.position == this.chair6 || dt.position == this.chair5).length == 2 || data.filter((dt: any) => dt.position == this.chair2 || dt.position == this.chair3).length == 2) {
              this.enemyDistance.push({ position: d.position, distance: 1 })
            } else {
              this.enemyDistance.push({ position: d.position, distance: 2 })
            }
          }
          else if (data.length == 5) {
            this.enemyDistance.push({ position: d.position, distance: 2 })
          }
          else if (data.length == 6) {
            this.enemyDistance.push({ position: d.position, distance: 3 })
          } else {
            this.enemyDistance.push({ position: d.position, distance: 1 })
          }
          if (d.sid == this.roomHost) {
            this.hosting1 = true
          }
        } else if (this.chair2 == d.position) {
          this.chair2user = true
          if (data.filter((dt: any) => dt.position == this.chair1 || dt.position == this.chair5 || dt.position == this.chair6).length >= 1) {
            if (data.find((dt: any) => dt.position == this.chair3)) {
              this.enemyDistance.push({ position: d.position, distance: 2 })
            } else {
              this.enemyDistance.push({ position: d.position, distance: 1 })
            }
          } else {
            this.enemyDistance.push({ position: d.position, distance: 1 })
          }
          if (d.sid == this.roomHost) {
            this.hosting2 = true
          }
        } else if (this.chair3 == d.position) {
          this.chair3user = true
          this.enemyDistance.push({ position: d.position, distance: 1 })
          if (d.sid == this.roomHost) {
            this.hosting3 = true
          }
        } else if (this.chair4 == d.position) {
          this.chair4user = true
          if (d.sid == this.roomHost) {
            this.hosting4 = true
          }
        } else if (this.chair5 == d.position) {
          this.chair5user = true
          this.enemyDistance.push({ position: d.position, distance: 1 })
          if (d.sid == this.roomHost) {
            this.hosting5 = true
          }
        }
        else if (this.chair6 == d.position) {
          this.chair6user = true
          if (data.filter((dt: any) => dt.position == this.chair3 || dt.position == this.chair2 || dt.position == this.chair1).length >= 1) {
            if (data.find((dt: any) => dt.position == this.chair5)) {
              this.enemyDistance.push({ position: d.position, distance: 2 })
            } else {
              this.enemyDistance.push({ position: d.position, distance: 1 })
            }
          } else {
            this.enemyDistance.push({ position: d.position, distance: 1 })
          }

          if (d.sid == this.roomHost) {
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
    if(this.canAttack == true){
    for (let index = 1; index < 7; index++) {
      if(this.chairPos[index] != this.myPos){
      let icon = this.elementRef.nativeElement.querySelector("#chairpvp" + String(index))
      icon.className = 'none';
      }
    }
  }
    this.closeAll();
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
      case 'witch':
        this.witchEffect();
        break;
      case 'puta':
        this.putaEffect();
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
      case 'snale':
        this.snaleEffect();
        break;
      case 'merguin':
        this.merguinEffect();
        break;

      case 'martin':
        this.martinEffect();
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
      // this.targetedDistance = 9999;
    }
    //หยั่งรู้ : ก่อนจั่วการ์ด สามารถเปิดดูการ์ดบนสุดของกองการ์ดได้ x ใบ (x เท่ากับจำนวนผู้เล่นทั้งหมดในเกมนั้น แต่ไม่เกิน 5 ใบ) แล้วจัดเรียงการ์ดเหล่านั้นใหม่ โดยนำการ์ดที่ต้องการ (กี่ใบก็ได้) ไว้ด้านบนสุดของกองการ์ด ที่เหลือไว้ใต้กอง
  }

  luciferEffect(): void {
    this.maxAttack = 10
  }

  bloodyknightEffect(): void {
    this.specialAttack = ['heart', 'diamond'];
  }

  putaEffect(): void {
    this.putaGiveCount = 0;
    this.showGiveCard = true;
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
    this.handCard.push(this.decisionResult);
    this.foxiaStoredCard.push(this.decisionResult.id);
    this.decisionResult = null;
    this.storeConfirm = false;
    this.socket.emit("update inhand card", { code: this.lobbyCode, hand: this.handCard });
  }

  foxiaCancel() {
    if (this.foxiaStoredCard.length > 0) {
      this.api.updateInUse(this.roomcode, this.foxiaStoredCard).subscribe((data: any) => {
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
    this.confirmEffect = true;
    // in draw stage if draw only 1 card, this round 'attack' and 'duel' deal +1 damage
  }

  useBearylEffect() {
    this.bearylDamageAdjust = 1;
    this.drawAdjust -= 1;
    this.drawQueue.enqueue({ waiting: false, name: 'draw' });
    this.confirmEffect = false;
    this.next_queue();
  }

  snaleEffect() {
    this.confirmEffect = true;
    // in draw stage if not draw, can steal 1 other player inhand-card [ 1 or 2 player]
  }

  useSnaleEffect() {
    this.confirmEffect = false;
    this.stealablePlayers = this.others;
    this.stealablePlayers.forEach((sp: any) => {
      sp.stealed = false;
    });
    this.stealCard = true;
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