import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as signalR from '@microsoft/signalr';
import Message from 'src/app/models/message.model';
import User from 'src/app/models/user.model';
import TicTacToeService from 'src/app/services/games/tictactoe.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  message: Message = new Message();
  
  @Input() user: User = new User();
  @Input() otherUser: User = new User();

  constructor(private ticTacToeServie: TicTacToeService, private route: ActivatedRoute, private router: Router) {
    const connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl(environment.talkBackUrl, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .build();

    connection.start().then(() => {
      console.log('SignalR Connected');
    }).catch(function(err) {
      return console.error(err.toString());
    });

    connection.on("InviteToPlay", (message) => {
      console.log("connection on");
      if (this.user.id === message.receiverId){
        debugger
        if(confirm(message.content)){
          this.router.navigateByUrl(`/${message.gameName}/${message.receiverId}/${message.userId}/${message.userId}`);
        }
      }
      else if (this.user.id === message.userId){
        this.router.navigateByUrl(`/${message.gameName}/${message.userId}/${message.receiverId}/${message.userId}`);
      }
    })
  }

  inviteToGame(gameName: string) {
    debugger
    this.message = new Message();
    this.message.gameName = gameName
    this.message.content = `${this.otherUser.userName} invite you to play ${this.message.gameName}. Do you want to play?`;
    this.message.userId = this.user.id;
    this.message.receiverId = this.otherUser.id;
    this.message.isInvite = true;
    this.ticTacToeServie.getInvitation(this.message).subscribe(m => {
    })
  }

  ngOnInit(): void {
  }

}
