import { Component, OnInit } from '@angular/core';
import { BookingService } from '../_services/booking.service';
import { BookingDetails } from '../_models/booking.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Ride, RidePosting } from '../_models/ride.model';
import { RideService } from '../_services/ride.service';
import {NgbdModalContent} from '../shared/modal.component';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-mybooking',
  templateUrl: './mybooking.component.html',
  styleUrls: ['./mybooking.component.css']
})
export class MybookingComponent implements OnInit {
mybookings:BookingDetails[];
rated:boolean;
bookingId:string;
rateForm: FormGroup
rideDetails:RidePosting[]
tempbookingDetails:BookingDetails[]

  constructor(private bookingService: BookingService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private rideService:RideService,
    private router:Router
    ) { }

  ngOnInit() {

    this.bookingService.getrides(localStorage.getItem('currentUser'))
      .subscribe(bookingData => {
        if (bookingData) {
          console.log('bookingdata',bookingData)
          this.mybookings=bookingData
        }
      }, err => {
        console.log('Something went wrong!');
      }
      );

      this.rateForm = this.fb.group({
        rating: ['', Validators.required],
        comment: ['']
      });
  }

showAllRides()
{
  this.bookingService.getrides(localStorage.getItem('currentUser'))
  .subscribe(bookingData => {
    if (bookingData) {
      console.log('bookingdata',bookingData)
      this.mybookings=bookingData
    }
  }, err => {
    console.log('Something went wrong!');
  }
  );
}

shownoshowUpRides()
{
  this.bookingService.getrides(localStorage.getItem('currentUser'))
  .subscribe(bookingData => {
    if (bookingData) {
      this.mybookings=bookingData.filter(value =>value.bookingStatus=='noshowup');
    }
  }, err => {
    console.log('Something went wrong!');
  }
  );
}


  // cancelBooking(bookingId){
  //   this.bookingService.cancelBooking(localStorage.getItem('currentUser'),bookingId)
  //   .subscribe(bookingData => {
  //     if (bookingData) {
  //       this.mybookings=bookingData
  //     }
  //   }, err => {
  //     console.log('Something went wrong!');
  //   }
  //   );
  // }

  cancelBooking(bookingId,date:string,time:string){
    var datetoCheck:Date=this.combineDateTime(date,time);
    var date_24_less=new Date(datetoCheck.getTime()-(1000*60*60*24)) // minus 24 hours
    if(new Date()<date_24_less){ //this condition to change.
    this.bookingService.cancelBooking(localStorage.getItem('currentUser'),bookingId)
    .subscribe(bookingData => {
      if (bookingData) {
        this.mybookings=bookingData
      }
    }, err => {
      console.log('Something went wrong!');
    }
    );
  }
    else
    {
      const modal=this.modalService.open(NgbdModalContent);
      modal.componentInstance.result = 'You can not cancel the ride if less than 24 hours are remaining';
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

  navigateToMessage(id:string){
    this.router.navigate(['/dashboard/message', { id:id }]);
    this.modalService.dismissAll()
  }

getRideDetails(rideId:string)
{
  this.rideService.getridebyRideId(rideId)
  .subscribe(rideData => {
    if (rideData) {
      this.rideDetails=rideData
    }
  }, err => {
    console.log('Something went wrong!');
  }
  );
}

    // modal pop up open starts
    open(content) {
      this.modalService.open(content, {size:'lg', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      }, (reason) => {
  
      });
    } // modal pop up open ends

  // save comments and ratings for a ride after its completion.
  rateChanged()
  {
    this.bookingService.updateRating(localStorage.getItem('currentUser'),this.bookingId,this.rateForm.value.rating,this.rateForm.value.comment)
    .subscribe(bookingData => {
      if (bookingData) {
        console.log('updated');
        this.rated=true;
        this.mybookings=bookingData
      }
    }, err => {
      console.log('Something went wrong!');
    }
    );
} // ratechanged ends

  // get set property used for validation
  get rating() { return this.rateForm.get('rating') }
  }
