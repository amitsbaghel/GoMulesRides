import { Component, OnInit } from '@angular/core';
import { RideService } from '../_services/ride.service';
import { Ride, RidePosting } from '../_models/ride.model';

@Component({
  selector: 'app-myrideposting',
  templateUrl: './myrideposting.component.html',
  styleUrls: ['./myrideposting.component.css']
})
export class MyridepostingComponent implements OnInit {
  myridepostings:RidePosting[]
  constructor(private rideService:RideService) { }

  ngOnInit() {
    this.rideService.getridesbyuser(localStorage.getItem('currentUser'))
    .subscribe(rideData => {
      if (rideData) {
        // rideData.map(data => { data.time = '1900-01-01T' + data.time });
        this.myridepostings=rideData
      }
    }, err => {
      console.log('Something went wrong!');
    }
    );
  } //ngOnInt ends

  //completetheride starts
  completetheride(rideid:string)
  {
    this.rideService.updateStatusRide(localStorage.getItem('currentUser'),rideid)
    .subscribe(rideData => {
      if (rideData) {
        debugger;
        console.log(rideData)
        this.myridepostings=rideData
      }
    }, err => {
      console.log('Something went wrong!');
    }
    );
  } //completetheride ends

  
  canceltheride(rideid:string)
  {
    this.rideService.canceltheRide(localStorage.getItem('currentUser'),rideid)
    .subscribe(rideData => {
      if (rideData) {
        debugger;
        console.log(rideData)
        this.myridepostings=rideData
      }
    }, err => {
      console.log('Something went wrong!');
    }
    );
  }
}
