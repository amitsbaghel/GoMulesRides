import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { RideService } from '../_services/ride.service';
import { RidePosting } from '../_models/ride.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ScriptService } from '../shared/script.service';
import { BookingService } from '../_services/booking.service';
import { Booking } from '../_models/booking.model'
import { UserService } from '../_services/user.service';
import { SumPipe } from '../shared/sum.pipe';
@Component({
  selector: 'app-rides',
  templateUrl: './rides.component.html',
  styleUrls: ['./rides.component.css']
})
export class RidesComponent implements OnInit, AfterViewInit {
  ridesDetails: RidePosting[]
  closeResult: string
  totalSeat: string // total seats available
  chargeperSeat: string // charge per seat
  seatselected: string // total seats selected
  remainingseats:number // remaining seats
  rideID: string //which is shown in modal popup
  wallet: string = ""
  booked: boolean = false
  rideposterDetails:RidePosting[]

  @ViewChild('fromcity') fromCityauto: ElementRef;
  @ViewChild('tocity') toCityauto: ElementRef;
  @ViewChild('distance') distanceEle: ElementRef;
  @ViewChild('duration') durationEle: ElementRef;

  // constructor starts
  constructor(private rideService: RideService, private scriptloader: ScriptService, private modalService: NgbModal, private userService: UserService, private bookingService: BookingService,private sumPipe:SumPipe) {

  } //constructor ends

  //ngOnInit starts
  ngOnInit() {

    // getting all rides and fill
    this.rideService.getrides({})
      .subscribe(ridedata => {
        if (ridedata) {
          
          this.ridesDetails = ridedata
        }
      }, err => {
        console.log('Something went wrong!');
      }
      );  //get rides ends

    // get user data
  } //ngOnInit ends

  //get ride poster details including comments, rating.
  getRidePosterDetails(userid)
  {
    this.rideService.getRidePosterDetails(userid)
    .subscribe(rideposterdetails => {
      console.log('rideposterdetails',rideposterdetails)
      if (rideposterdetails) {
        this.rideposterDetails=rideposterdetails
      }
    }, err => {
      console.log('Something went wrong!');
    }
    );  //get rides ends
  }

  // get user data on the basis of user ID
  getUserData() {
    // getUserData starts
    this.userService.getUserData(localStorage.getItem('currentUser'))
      .subscribe(userData => {
        if (userData) {
          this.wallet=userData.wallet;
        }
      }, err => {
        console.log('Something went wrong!');
      }
      );  //getUserData ends
  }

  //search starts
  search(fromCity: string, toCity: string) {

        // getting all rides and fill
        let searchkeyword={
          from: fromCity?fromCity:undefined,
          to:toCity?toCity:undefined
        }

    this.rideService.getridesSearch(searchkeyword)
    .subscribe(ridedata => {
      if (ridedata) {
        // console.log('ridedata',ridedata);
        this.ridesDetails = ridedata
      }
    }, err => {
      console.log('Something went wrong!');
    }
    );  //get rides ends

    if(!fromCity && !toCity)
    return false;

    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [fromCity],
        destinations: [toCity],
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        durationInTraffic: true,
        avoidHighways: false,
        travelMode: google.maps.TravelMode.DRIVING,
        avoidTolls: false
      }, response_data.bind(this)); // WOW learning moment

    function response_data(responseDis, status) {
      if (status !== google.maps.DistanceMatrixStatus.OK || status != "OK") {
        console.log('Error:', status);
      } else {
        if(responseDis.originAddresses[0]=="" && responseDis.destinationAddresses[0]==""){
        this.distanceEle.nativeElement.value = responseDis.rows[0].elements[0].distance.text
        this.durationEle.nativeElement.value = responseDis.rows[0].elements[0].duration.text
        }
      }
    }


  }//search ends

  // booking starts
  bookRide() {
    // save booking data
    let bookingData: Booking = {
      seat: this.seatselected,
      charge: parseInt(this.seatselected) * parseInt(this.chargeperSeat) + "",
      rideID: this.rideID,
      userID: localStorage.getItem('currentUser')
    }

    this.bookingService.bookRide(bookingData)
      .subscribe(bookingData => {
        if (bookingData) {
          this.booked = true
          this.ridesDetails = bookingData
          let openRide =this.ridesDetails.find(function(element) {
            return element._id._id == this.rideID;
          }.bind(this));
          this.remainingseats=openRide._id.overallseats-openRide.totalbookingseats
          this.getUserData()
          this.seatselected=null
        }
      }, err => {
        console.log('Something went wrong!');
      }
      );
  } //booking save ends

  // modal pop up open starts
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      // this.closeResult = 'Closed with: ${result}';
      console.log('save button')

    }, (reason) => {

      console.log('close ')
      this.closeResult = 'Dismissed ${this.getDismissReason(reason)}';

    });
  } // modal pop up open ends

    // modal pop up open starts
    openRidePosterModal(content) {
      this.modalService.open(content, {size:'lg', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      }, (reason) => {
  
      });
    } // modal pop up open ends

  // getDismissReason starts
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return 'with: ${reason}';
    }
  } // getDismissReason open ends

  // ngAfterViewInit starts
  ngAfterViewInit() {

    this.scriptloader.load('googlemaps', 'googledistance').then(data => {

      var fromcityAuto = new google.maps.places.Autocomplete(this.fromCityauto.nativeElement);
      // Set the data fields to return when the user selects a place.
      fromcityAuto.setComponentRestrictions(
        { 'country': ['us'] });

      fromcityAuto.setTypes(['(cities)'])

      var tocityAuto = new google.maps.places.Autocomplete(this.toCityauto.nativeElement);
      // Set the data fields to return when the user selects a place.
      tocityAuto.setComponentRestrictions(
        { 'country': ['us'] });

      tocityAuto.setTypes(['(cities)'])
    }).catch(error => console.log(error));
  } // ngAfterViewInit ends
}
