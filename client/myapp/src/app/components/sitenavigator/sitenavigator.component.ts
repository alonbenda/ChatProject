import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import User from 'src/app/models/user.model';
import LogInService from 'src/app/services/logIn.service';

@Component({
  selector: 'app-sitenavigator',
  templateUrl: './sitenavigator.component.html',
  styleUrls: ['./sitenavigator.component.css']
})
export class SitenavigatorComponent implements OnInit {

  @Input() user: User = new User();

  constructor(private logInService: LogInService, private router: Router) { }

  @HostListener('window:popstate', ['$event'])
  onPopState() {
    this.logOut();
  }

  @HostListener('window:beforeunload', ['$event'])
  doSomething() {
    debugger
    if (window.opener.location.reload()) {
      debugger
      this.logOut();
    }
  }

  logOut() {
    this.logInService.logOutUser(this.user).subscribe(data => {
      this.router.navigateByUrl('/');
    })
  }

  ngOnInit(): void {
  }

}
