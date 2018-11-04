import { Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { RideService } from '../_services/ride.service';
import { RideDetails } from '../_models/ride.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ScriptService } from '../shared/script.service';
@Component({
  selector: 'app-rides',
  templateUrl: './rides.component.html',
  styleUrls: ['./rides.component.css']
})
export class RidesComponent implements OnInit,AfterViewInit {
  ridesDetails: RideDetails[]
  closeResult: string
  modalSeat:string
  modalCharge:string
  @ViewChild('fromcity') fromCityauto: ElementRef;
  @ViewChild('tocity') toCityauto: ElementRef;
  @ViewChild('distance') distanceEle: ElementRef;
  @ViewChild('duration') durationEle: ElementRef;

  constructor(private rideService: RideService,private scriptloader: ScriptService, private modalService: NgbModal) {
  
   }

  ngOnInit() {

    // getting all rides and fill
    this.rideService.getrides({})
      .subscribe(ridedata => {
        if (ridedata) {
          
          // no need to add this . add this at the time of insert.
          ridedata.map(data => {  data.time = '1900-01-01T' + data.time });
          this.ridesDetails = ridedata
        }
      }, err => {
        console.log('Something went wrong!');
      }
      );
  } //saveRide ends

  //search starts
  search(fromCity:string,toCity:string){
  
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [fromCity],
        destinations: [toCity],            
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        durationInTraffic: true,
        avoidHighways: false,
        travelMode:google.maps.TravelMode.DRIVING,
        avoidTolls: false
      }, response_data);

      function response_data(responseDis, status) {
      if (status !== google.maps.DistanceMatrixStatus.OK || status != "OK"){
        console.log('Error:', status);
        // OR
        //alert(status);
      }else{
         document.getElementById('distance').value=responseDis.rows[0].elements[0].distance.text
         document.getElementById('duration').value=responseDis.rows[0].elements[0].duration.text
        //https://netbasal.com/a-comprehensive-guide-to-angular-onpush-change-detection-strategy-5bac493074a4

      }
    }}//search ends

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

    this.scriptloader.load('googlemaps','googledistance').then(data => {

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
