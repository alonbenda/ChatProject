import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as signalR from '@microsoft/signalr';
import User from 'src/app/models/user.model';
import TicTacToeService from 'src/app/services/games/tictactoe.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.css']
})
export class TicTacToeComponent implements OnInit {

  user: User = new User();
  otherUser: User = new User();

  mainUser!: User;

  constructor( public boardService: TicTacToeService, private route: ActivatedRoute) {
    route.params.subscribe((params) => {
      let userId = params["id1"];
      let otherUserId = params["id2"];
      let mainUserId = params["id3"];
      this.boardService.getUserById(userId).subscribe(data => {
        this.user = data as User;
      })
      this.boardService.getUserById(otherUserId).subscribe(data => {
        this.otherUser = data as User;
      })
      if (userId === mainUserId) {
        this.boardService.getUserById(mainUserId).subscribe(data => {
          this.mainUser = data as User;
        })
      }
    })

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

    connection.on("ResetGame", (user) => {
      console.log("connection on");
      debugger
      if (user.id === this.user.id){
        debugger
        this.boardService.newGame();
      }
    })
   }

  ngOnInit() {
    this.boardService.newGame();
  }
  

  resetGame(){
    this.boardService.newGame();
    debugger
    this.boardService.getResetGame(this.otherUser).subscribe();
  }

}
