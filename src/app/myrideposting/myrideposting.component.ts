import { Component, OnInit } from '@angular/core';
import { RideService } from '../_services/ride.service';
import { Ride, RidePosting } from '../_models/ride.model';
import { BookingDetails } from '../_models/booking.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingService } from '../_services/booking.service';
import {NgbdModalContent} from '../shared/modal.component';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-myrideposting',
  templateUrl: './myrideposting.component.html',
  styleUrls: ['./myrideposting.component.css']
})
export class MyridepostingComponent implements OnInit {
  myridepostings:RidePosting[]
  ridebookingdetails: BookingDetails[]
  ridebookingdetailscomp: BookingDetails[]
  rideID:string
  rideDate:string
  rideTime:string
  rideCompleted:boolean
  markedNoShowUp:boolean

  constructor(private rideService:RideService,
    private bookingService:BookingService,
    private modalService: NgbModal,
    private router:Router) { }

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

  navigateToMessage(id:string){
    this.router.navigate(['/dashboard/message', { id:id }]);
    this.modalService.dismissAll()
  }

  // modal pop up open starts
  open(content) {
    this.modalService.open(content, { size:'lg', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason) => {

    });
  } // modal pop up open ends

  //complete the ride starts
  completetheride() //rideid:string,date:string,time:string
  {
    var datetoCheck:Date=this.combineDateTime(this.rideDate,this.rideTime); //date,time
     if(datetoCheck<=new Date()) // open it for prod
{
    this.rideService.updateStatusRide(localStorage.getItem('currentUser'),this.rideID) //rideid
    .subscribe(rideData => {
      if (rideData) {
        this.myridepostings=rideData
        // here a popup message to show ride successfully market completed.
        this.rideCompleted=true
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

  getBookingsByRideIdcomplete(rideid:string,date:string,time:string)
  {
    this.rideID=rideid;
    this.rideDate=date;
    this.rideTime=time;
    this.rideCompleted=false
    this.markedNoShowUp=false

    this.bookingService.getbookingsbyRideIdNotCancelled(rideid)
    .subscribe(ridebookingdetails => {
      if (ridebookingdetails) {
        console.log(ridebookingdetails)
        this.ridebookingdetailscomp=ridebookingdetails
      }
    }, err => {
      console.log('Something went wrong!');
    }
    );
  }

  markBookingNoShowUp(bookingID:string){
    // debugger
    var datetoCheck:Date=this.combineDateTime(this.rideDate,this.rideTime); //date,time
    if(datetoCheck<=new Date()) {

    this.bookingService.markBookingNoShowUp(bookingID,this.rideID)
    .subscribe(bookingData => {
      if (bookingData) {
        this.ridebookingdetailscomp=bookingData;
        
      }
    }, err => {
      console.log('Something went wrong!');
    }
    );
  }
  else{
    const modal=this.modalService.open(NgbdModalContent);
    modal.componentInstance.result = 'Ride is not yet complete';
  }
  }

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
