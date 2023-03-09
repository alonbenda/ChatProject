import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as signalR from '@microsoft/signalr';
import User from 'src/app/models/user.model';
import HubConnectionService from 'src/app/services/hub-connection/hub-connection.service';
import UserService from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  me: User = new User();
  users: User[] = [];

  constructor(private userServie: UserService, private route: ActivatedRoute, private router: Router, private hub: HubConnectionService) {
    route.params.subscribe((params) => {
      let uName = params["userName"];
      userServie.getUsers().subscribe((users) => {
        users.forEach(user => {
          if(user.userName === uName){
            this.me = user;
        }})
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
      this.getUsers();
    }).catch(function(err) {
      return console.error(err.toString());
    });

    connection.on("getConnectedUsers", () => {
      console.log("connection on")
      this.getUsers();
    })
   }

  getUsers() {
    this.userServie.getUsers().subscribe(data => {
      this.users = data as User[];
    })
  }

  goToChatWithUser(id : number){
    this.router.navigateByUrl(`/chat/${this.me.id}/${id}`);
  }

  ngOnInit(): void {
  }

}
