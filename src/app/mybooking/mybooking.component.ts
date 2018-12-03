import { Component, OnInit } from '@angular/core';
import { BookingService } from '../_services/booking.service';
import { BookingDetails } from '../_models/booking.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Ride, RidePosting } from '../_models/ride.model';
import { RideService } from '../_services/ride.service';

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

  constructor(private bookingService: BookingService,private modalService: NgbModal,private fb: FormBuilder,private rideService:RideService) { }

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

  cancelBooking(bookingId){
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
