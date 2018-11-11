import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  welcomeUser: string

  constructor(private userService: UserService) {

  }

  logout() {
    localStorage.removeItem('currentUser')
  }

  ngOnInit() {

    // get user data on the basis of user ID
    // getUserData starts
    this.userService.getUserData(localStorage.getItem('currentUser'))
      .subscribe(userData => {
        if (userData) {
          this.welcomeUser = "Welcome " + userData.name
        }
      }, err => {
        console.log('Something went wrong!');
      }
      );  //getUserData ends
  }
}
