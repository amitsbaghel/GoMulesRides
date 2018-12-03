/// <reference types="@types/googlemaps" />
import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ScriptService } from '../shared/script.service'
import { RideService } from '../_services/ride.service';
import { Ride } from '../_models/ride.model';
import { NgbTimeStringAdapter } from '../shared/timepicker-adapter';
import { NgbTimeAdapter, NgbDateAdapter, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateAmericanFormatAdapter } from '../shared/datepicker-adapter';

@Component({
  selector: 'app-addride',
  templateUrl: './addride.component.html',
  styleUrls: ['./addride.component.css'],
  providers: [{ provide: NgbTimeAdapter, useClass: NgbTimeStringAdapter },
  { provide: NgbDateAdapter, useClass: NgbDateAmericanFormatAdapter }
  ]
})
export class AddrideComponent implements OnInit, AfterViewInit {
  @ViewChild('fromCityauto') fromCityauto: ElementRef;
  @ViewChild('toCityauto') toCityauto: ElementRef;
  rideSaved: boolean = false
  priorDatesDisabled:any
  // todaydate:Date
  ride:Ride

  constructor(private scriptloader: ScriptService, private rideService: RideService) {
    this.ride = {
      date: this.getTodaysDate(),from: "",to: "",seat: 0,time: this.getTime(),charge: ""
    }
   }

   // get current hour with desired formating.
   getTime(){
    var date=new Date();
    date.setHours(date.getHours() + 2);
    var hour=date.getHours()<10?('0'+date.getHours()):date.getHours()
    var month=(date.getMonth()+1)<10?('0'+date.getMonth()):date.getMonth()
    var dateVal=date.getDate()<10?('0'+date.getDate()):date.getDate()
    return date.getFullYear()+"-"+month+"-"+dateVal+"T"+ hour+(":00:00")
   }

   // get today's date
   getTodaysDate(){
    var date=new Date();
    var year=date.getFullYear()
    var month=(date.getMonth()+1)<10?('0'+(date.getMonth()+1)):(date.getMonth()+1)
    var datevar=date.getDate()<10?('0'+date.getDate()):date.getDate()
    return month+"/"+datevar+"/"+year 
   }

  saveRide(): void {
    this.ride.from = this.fromCityauto.nativeElement.value;
    this.ride.to = this.toCityauto.nativeElement.value;
    this.rideService.saveride(this.ride)
      .subscribe(ridedata => {
        if (ridedata) {
          this.rideSaved = true
          // reset the values
          this.ride = {date:this.getTodaysDate(),from: "",to: "",seat: 1,time: this.getTime(),charge: ""
          }
        }
        //here to code for save show.

      }, err => {
        console.log('Something went wrong!');
      }
      );
  } //saveRide ends

  // ngAfterViewInit starts
  ngAfterViewInit() {
 
    this.scriptloader.load('googlemaps').then(data => {

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

  // ngOnInit starts
  ngOnInit() {

    // validation for disablnig dates before the today's date.
    this.priorDatesDisabled=(date: NgbDate, current: {month: number}) => date.before(new NgbDate(new Date().getFullYear(),new Date().getMonth()+1,new Date().getDate()));

  } // ngOnInit ends

  // validation for integer value only
  isInteger(event){
    if(isNaN(event.key)){
      return false    
    }
    return true
  }
}
