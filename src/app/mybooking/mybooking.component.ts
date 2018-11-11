import { Component, OnInit } from '@angular/core';
import { BookingService } from '../_services/booking.service';
import { BookingDetails } from '../_models/booking.model';

@Component({
  selector: 'app-mybooking',
  templateUrl: './mybooking.component.html',
  styleUrls: ['./mybooking.component.css']
})
export class MybookingComponent implements OnInit {
mybookings:BookingDetails[];

  constructor(private bookingService: BookingService) { }

  ngOnInit() {

    this.bookingService.getrides(localStorage.getItem('currentUser'))
      .subscribe(bookingData => {
        if (bookingData) {
          // bookingData.map(data => { data.rideId.time = '1900-01-01T' + data.rideId.time });
          this.mybookings=bookingData
        }
      }, err => {
        console.log('Something went wrong!');
      }
      );
  }
}
