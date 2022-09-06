import { HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebSocketService } from "../../web-socket.service";

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  roomMAX: any;
  arr: any[] = []
  constructor(private router: Router, private socket: WebSocketService, private elementRef: ElementRef) {
    this.arr.push({
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    })
    console.log(this.arr)
  }

  lobbyCode: string = '';

  ngOnInit(): void {
    this.socket.emit('get room info', {});
    this.socket.listen('sctc').subscribe((data: any) => {
      this.appendChat('<p class="text-right text-primary">' + data.username + ': ' + data.message + '</p>');
    });
    this.socket.listen('set room').subscribe((room: any) => {
      this.elementRef.nativeElement.querySelector('.show_code').textContent = room.code;
      this.lobbyCode = room.code;
      this.roomMAX = room.max;
    });
  }

  typingChat(e: any): boolean {
    let message = this.elementRef.nativeElement.querySelector('.chat-input').textContent;
    if (e.which === 13 && !e.shiftKey) {
      this.socket.emit('scts', { message: message, code: this.lobbyCode });
      this.appendChat('<p class="text-end text-success message" style="font-size:24px">' + message + '</p>');
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
  // var room = [];
  // $(function() {
  //     let ip_address = '127.0.0.1';
  //     let socket_port = '3000';
  //     let socket = io(ip_address + ':' + socket_port);
  //     socket.emit('get room info');

  //     $('#chatInput').on('keypress', function(e) {
  //         let message = $(this).html();
  //         if(e.which === 13 && !e.shiftKey){
  //             socket.emit('scts', message);
  //             $('.chatline').append('<p class="text-end text-success">'+message+'</p>');
  //             chatInput.html('');

  //             return false;
  //         }
  //     });

  //     socket.on('sctc', (message) => {
  //         $('.chatline').append('<p class="text-right text-primary">'+message+'</p>');
  //     });
  //     socket.on('redirect', url => {
  //         // redirect to new URL
  //         window.location = url;
  //     });
  //     socket.on('set room', (room) => {
  //         room = room;
  //         console.log(room);
  //         $('#show_code').html(room.code)
  //     });

  // });
}
