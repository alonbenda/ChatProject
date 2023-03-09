import { Component, Input, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import Square from 'src/app/models/square.model';
import User from 'src/app/models/user.model';
import TicTacToeService from 'src/app/services/games/tictactoe.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {

  @Input() square!: Square;
  @Input() mainUser!: User;
  @Input() myUserId!: number;
  @Input() otherUserId!: number;
  myTurn: boolean = false;

  constructor(public gameService: TicTacToeService) {
    const connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl(environment.talkBackUrl, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .build();

    connection.start().then(() => {
      console.log('SignalR Connected');
      if (this.mainUser) {
        this.myTurn = true;
      }
    }).catch(function(err) {
      return console.error(err.toString());
    });

    connection.on("UpdatedBoard", (state) => {
      console.log("connection on");
      if (this.square.id === state.id && state.otherPlayerId === this.myUserId){
        debugger
        this.square.state = state.state;
        this.gameService.changePlayerTurn(this.square);
      }
      this.myTurn = !this.myTurn;
    })
   }

  ngOnInit() {
  }

  changePlayer(){
    debugger
    if(this.myTurn && this.square.state === null){
      this.gameService.isGameRunning = true;
      
      if ( this.gameService.isGameRunning && this.square.state === null ){
        this.square.state =  this.gameService.activePlayer;
        this.square.otherPlayerId = this.otherUserId;
        this.gameService.changePlayerTurn(this.square);
      }
      this.gameService.getUpdatedBoard(this.square).subscribe(state =>{
      });
    }
  }
}
