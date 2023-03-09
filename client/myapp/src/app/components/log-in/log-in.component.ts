import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import LogInService from 'src/app/services/logIn.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  userName: string = "";
  pWord: string = "";

  constructor(private logInService: LogInService, private router: Router, private httpClient : HttpClient) { }

  loginUser(){
    if(this.pWord !== "" && this.userName !== ""){
      this.logInService.getUsers().subscribe(users => {
        users.forEach(user => {
          if (user.userName === this.userName && user.password === this. pWord){
            this.logInService.logInUser(user).subscribe(data => {
              this.router.navigateByUrl(`/home-page/${this.userName}`);
            })
          }
        })
      })
    }
  }

  ngOnInit(): void {
  }

}
