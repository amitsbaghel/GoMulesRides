import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'goMulesRides';
  loggedIn=true


  gotoDashboard(value){
    console.log("emitted to parent : " +value)
    this.loggedIn=value
  }

}
