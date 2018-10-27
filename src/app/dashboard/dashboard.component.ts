import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  welcomeUser: string = "Welcome"
  constructor() {

  }

  logout() {
    localStorage.removeItem('currentUser')
  }

  ngOnInit() {
  }

}
