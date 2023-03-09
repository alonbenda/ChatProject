import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import User from 'src/app/models/user.model';
import UserService from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  me: User = new User();

  constructor(private userServie: UserService, private route: ActivatedRoute, private router: Router) {
    route.params.subscribe((params) => {
      let myId = params["id"];
      this.userServie.getUserById(myId).subscribe(data => {
        this.me = data as User;
      })
    })
  }

  ngOnInit(): void {
  }

}
