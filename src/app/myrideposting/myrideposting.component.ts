import { Component, OnInit } from '@angular/core';
import { RideService } from '../_services/ride.service';
import { Ride, RidePosting } from '../_models/ride.model';
import { BookingDetails } from '../_models/booking.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingService } from '../_services/booking.service';
import {NgbdModalContent} from '../shared/modal.component';

@Component({
  selector: 'app-myrideposting',
  templateUrl: './myrideposting.component.html',
  styleUrls: ['./myrideposting.component.css']
})
export class MyridepostingComponent implements OnInit {
  myridepostings:RidePosting[]
  ridebookingdetails: BookingDetails[]
  constructor(private rideService:RideService,private bookingService:BookingService,private modalService: NgbModal) { }

  ngOnInit() {
    this.rideService.getridesbyuser(localStorage.getItem('currentUser'))
    .subscribe(rideData => {
      console.log('ridedata',rideData)
      if (rideData) {
        this.myridepostings=rideData
      }
    }, err => {
      console.log('Something went wrong!');
    }
    );
  } //ngOnInt ends

  getBookingsByRideId(rideId:number){
    this.bookingService.getbookingsbyRideId(rideId)
    .subscribe(ridebookingdetails => {
      if (ridebookingdetails) {
        this.ridebookingdetails=ridebookingdetails
      }
    }, err => {
      console.log('Something went wrong!');
    }
    );
  }

  // modal pop up open starts
  open(content) {
    this.modalService.open(content, { size:'lg', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason) => {

    });
  } // modal pop up open ends

  //complete the ride starts
  completetheride(rideid:string,date:string,time:string)
  {
    var datetoCheck:Date=this.combineDateTime(date,time);
    // var anotherdate= new Date(datetoCheck);
    // anotherdate.setHours(anotherdate.getHours()-1)
    // console.log('anotherdate',anotherdate);
    // console.log('datetoCheck',datetoCheck);
        // if(datetoCheck<=anotherdate) // open it for dev
    // if(1==1) //removed validation.
     if(datetoCheck<=new Date()) // open it for prod
{
    this.rideService.updateStatusRide(localStorage.getItem('currentUser'),rideid)
    .subscribe(rideData => {
      if (rideData) {
        this.myridepostings=rideData
      }
    }, err => {
      console.log('Something went wrong!');
    }
    );
  }
  else
  {
    const modal=this.modalService.open(NgbdModalContent);
    modal.componentInstance.result = 'Ride is not yet complete';
  }
  } //completetheride ends

  combineDateTime(date:string,time:string):Date
  {
    var newDate=new Date(date);
    var newTime=new Date(time);
    var year=newDate.getFullYear();
    var month=newDate.getMonth()+1;
    var day=newDate.getDate();
    var hour=newTime.getHours();
    var minute=newTime.getMinutes();
    var combinedDate=new Date(year+"-"+this.pad(month)+"-"+this.pad(day)+"T"+this.pad(hour)+":"+this.pad(minute))
    return combinedDate;
  }

  pad(value)
  {
    return value<10?'0'+value:value;
  }
  
  // cancel ride starts.
  canceltheride(rideid:string)
  {
    this.rideService.canceltheRide(localStorage.getItem('currentUser'),rideid)
    .subscribe(rideData => {
      if (rideData) {
        this.myridepostings=rideData
      }
    }, err => {
      console.log('Something went wrong!');
    }
    );
  } // cancel ride ends
}
