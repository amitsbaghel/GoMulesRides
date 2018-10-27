/// <reference types="@types/googlemaps" />
import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ScriptService } from '../shared/script.service'
import { RideService } from '../_services/ride.service';
import { Ride } from '../_models/ride.model';
import { NgbTimeStringAdapter } from '../shared/timepicker-adapter';
import { NgbTimeAdapter,NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateAmericanFormatAdapter } from '../shared/datepicker-adapter';
@Component({
  selector: 'app-addride',
  templateUrl: './addride.component.html',
  styleUrls: ['./addride.component.css'],
  providers: [{provide: NgbTimeAdapter, useClass: NgbTimeStringAdapter},
              {provide: NgbDateAdapter, useClass: NgbDateAmericanFormatAdapter}
            ]
})
export class AddrideComponent implements OnInit, AfterViewInit {
  @ViewChild('fromCityauto') fromCityauto: ElementRef;
  @ViewChild('toCityauto') toCityauto: ElementRef;
  rideSaved:boolean=false

  ride:Ride={
    date:new Date().toLocaleDateString("en-US"),
    from:"",
    to:"",
    seat:1,
    time:"13:01:00"
  }

  // ,private fb: FormBuilder
  constructor(private scriptloader: ScriptService,private rideService:RideService) { }

  saveRide(): void {

    //validation

    this.ride.from=this.fromCityauto.nativeElement.value;
    this.ride.to=this.toCityauto.nativeElement.value;

      this.rideService.saveride(this.ride)
      .subscribe(ridedata => {
        
        if(ridedata)
        {
          this.rideSaved=true

          // reset the values
          this.ride={
            date:new Date().toLocaleDateString("en-US"),
            from:"",
            to:"",
            seat:1,
            time:"01:00:00"
          }
        }
        //here to code for save show.
  
      },err=>{
        console.log('Something went wrong!');}
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

  // https://gist.githubusercontent.com/Lwdthe1/81818d30d23f012628aac1cdf672627d/raw/2036f2ddea9ace3716ebcdaa341e0f71020d68d4/usaCities.js


  // ngOnInit starts
  ngOnInit() {
    // this.rideForm = this.fb.group({
    //   fromCity: ['', { updateOn: 'blur' }, Validators.required],
    //   toCity: ['', { updateOn: 'blur' }, Validators.required],
    //   journeyDate: ['', { updateOn: 'blur' }, Validators.required],
    //   journeyTime: ['', { updateOn: 'blur' }, Validators.required],
    //   seat:['', { updateOn: 'blur' }, Validators.required]
    // });
  } // ngOnInit ends
}
