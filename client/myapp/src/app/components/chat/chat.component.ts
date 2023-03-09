import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Message from 'src/app/models/message.model';
import User from 'src/app/models/user.model';
import ChatService from 'src/app/services/chat.service';
import HubConnectionService from 'src/app/services/hub-connection/hub-connection.service';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  me: User = new User();
  user: User = new User();

  myUserName: string = "";
  userUserName: string = "";
  
  message?: Message;
  content: string = "";

  messages: Message[] = [];

  constructor(private chatServie: ChatService, private route: ActivatedRoute, private hub: HubConnectionService) {
    route.params.subscribe((params) => {
      let myId = params["id1"];
      let userId = params["id2"]
      this.chatServie.getUserById(myId).subscribe(data => {
        this.me = data as User;
        this.myUserName = this.me.userName;
      })
      this.chatServie.getUserById(userId).subscribe(data => {
        this.user = data as User;
        this.userUserName = this.user.userName;
      })
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
      this.getMessages();
    }).catch(function(err) {
      return console.error(err.toString());
    });

    connection.on("SendMessage", () => {
      console.log("connection on")
      this.getLastMessage();
    })
  }

  sendMessage() {
    if (this.content){
      this.message = new Message();
      this.message.content = this.content;
      this.message.userId = this.me.id;
      this.message.receiverId = this.user.id;
      this.chatServie.sendMessage(this.message).subscribe(message =>{
      })
    }
  }

  getLastMessage() {
    this.chatServie.getMessages().subscribe(messages => {
      messages.forEach(m => {
        if (m.id === messages.length){
          this.messages.push(m);
        }
      })
    })
  }

  getMessages() {
    this.chatServie.getMessages().subscribe(messages => {
      messages.forEach(m => {
        if (m.userId === this.me.id || m.receiverId === this.me.id){
          if(m.receiverId === this.user.id || m.userId === this.user.id)
          this.messages.push(m);
        }
      })
    })
  }


  ngOnInit(): void {
  }

}
