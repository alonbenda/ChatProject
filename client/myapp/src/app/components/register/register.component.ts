import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import User from 'src/app/models/user.model';
import UserService from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  newUser: User = new User();

  constructor(private userService: UserService, private router: Router) { }

  addNewUser(){
    if(this.newUser.firstName && this.newUser.lastName && this.newUser.userName && this.newUser.password){
      this.userService.createUser(this.newUser).subscribe(()=>{
        this.router.navigateByUrl(`/home-page/${this.newUser.userName}`);
      })
    }
  }
  
  ngOnInit(): void {
  }

}
