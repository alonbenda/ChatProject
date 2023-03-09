import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SignalrClient, SignalrConnection } from "ngx-signalr-websocket";
import { Observable } from "rxjs";
import Message from "src/app/models/message.model";
import User from "src/app/models/user.model";
import Square from "src/app/models/square.model";
import { environment } from "src/environments/environment";

@Injectable()
class TicTacToeService {

    private connection?: SignalrConnection;
    private url = "TicTacToe/";

    public board: Square[] = [];
    boardSize: number = 9;
    activePlayer: string = "X";
    turnCount: number = 0;
    isGameRunning: boolean = false;
    isGameOver: boolean = false;
    winner: boolean = false;

    constructor(private httpClient : HttpClient) {
        const client = SignalrClient.create(httpClient);

        client.connect(environment.talkBackUrl).subscribe(connection =>{
            this.connection = connection;
        });
    }

    getUserById(id: number) : Observable<User> {
        return this.httpClient.get<User>(`${environment.apiUrl}/Users/` + id);
    }

    updatedBoard(square: Square) {
        this.connection?.send('UpdatedBoard', square);
    }
    getUpdatedBoard(square: Square) : Observable<Square> {
        return this.httpClient.put<Square>(`${environment.apiUrl}/${this.url}` + square.id, square);
    }

    invitetoplay(message: Message) {
        this.connection?.send('InviteToPlay', message);
    }
    getInvitation(message: Message) : Observable<Message> {
        return this.httpClient.post<Message>(`${environment.apiUrl}/${this.url}`, message);
    }

    resetGame() {
        this.connection?.send('ResetGame');
    }
    getResetGame(otherUser: User) {
        return this.httpClient.put(`${environment.apiUrl}/${this.url}`, otherUser);
    }

    newGame(){
        this.activePlayer = "X";
        this.turnCount = 0;
        this.isGameRunning = false;
        this.isGameOver =  false;
        this.winner = false;
        this.board = this.createBoard();
    } 
    
    createBoard(){
        let board = [];
        for( let i = 0; i < 9; i ++ ){
            board.push( { id: i, state: null } )
        };
        return board
    } 

    get getBoard (){
        return this.board
    }

    set setBoard( board: any  ){
        this.board = [...board]
    }
    
    changePlayerTurn( squareClicked: Square){  
        this.updateBoard( squareClicked )
        if(!this.isGameOver) this.activePlayer = this.activePlayer === "X" ? "O" : "X"
        this.turnCount ++;
        this.isGameOver = this.isGameOver ? true : false;
    }

    updateBoard( squareClicked: Square ){
        this.board[ squareClicked.id! ].state = squareClicked.state;
        if (this.isWinner) {
            this.winner = true;
            this.isGameRunning = false;
            this.isGameOver = true;
        }
    }

    get gameOver(): boolean{
        return this.turnCount > 8 || this.winner ? true : false
    }

    get isWinner(): boolean{
        return this.checkDiag() || this.checkRows(this.board, "row") || this.checkRows(this.board, "col") ? true : false;
    }

    checkRows( board: any[], mode: string ): boolean{
    
        const
            ROW = mode === "row" ? true : false,
            DIST = ROW ? 1 : 3,
            INC = ROW ? 3 : 1,
            NUMTIMES = ROW ? 7 : 3;

        for ( let i = 0; i < NUMTIMES; i += INC ){

            let 
                firstSquare = board[i].state,
                secondSquare =  board[i + DIST].state,
                thirdSquare = board[ i + ( DIST * 2)].state;

            if ( firstSquare && secondSquare && thirdSquare  ){
                if ( firstSquare === secondSquare && secondSquare === thirdSquare ) return true    
            }
        }
        return false
    }

    checkDiag (){
        const timesRun = 2,
            midSquare = this.board[4].state;

        for( let i = 0; i <= timesRun; i+=2 ){

            let 
            upperCorner = this.board[i].state,
            lowerCorner =  this.board[8 - i].state;
        
            if ( midSquare && upperCorner && lowerCorner  ){
                if( midSquare === upperCorner && upperCorner === lowerCorner) return true
            }
        }

        return false
    }
}

export default TicTacToeService;