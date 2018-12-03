import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ride,RidePosting } from '../_models/ride.model'
import { catchError, tap } from 'rxjs/operators'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { of } from 'rxjs'; // convert some data to observables
import { BookingDetails } from '../_models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class RideService {
  private dataUrl: string = 'http://localhost:3000/ride' // Node js server path
  constructor(private http: HttpClient) { }

  // get all rides
  getrides(searchdata: any): Observable<RidePosting[]> {

    return this.http.get<RidePosting[]>(this.dataUrl).pipe(
      catchError(this.handleError('ride', searchdata)));
  }
  
  getridesSearch(searchdata: any): Observable<RidePosting[]> {

    return this.http.get<RidePosting[]>(this.dataUrl+"/filter/rides/by/cities/"+searchdata.from+"/"+searchdata.to).pipe(
      catchError(this.handleError('ride', searchdata)));
  }

   // get  rides details by userId with more details
   getRidePosterDetails(userid: any): Observable<RidePosting[]> {
    return this.http.get<RidePosting[]>(this.dataUrl +'/details/comments/' + userid, {}).pipe(
      catchError(this.handleError('ridepost', {} as RidePosting[])));
  }

   // get rides by a ride Id
   getridebyRideId(rideid: any): Observable<RidePosting[]> {
    return this.http.get<RidePosting[]>(this.dataUrl + "/fetch/ride/by/id/" + rideid, {}).pipe(
      catchError(this.handleError('ride', {} as RidePosting[])));
  }

  // get  rides by a user Id
  getridesbyuser(userid: any): Observable<RidePosting[]> {
    return this.http.get<RidePosting[]>(this.dataUrl + "/" + userid, {}).pipe(
      catchError(this.handleError('ride', {} as RidePosting[])));
  }

  // update ride status to complete
  updateStatusRide(userid: any,rideid:string): Observable<RidePosting[]> {
    return this.http.get<RidePosting[]>(this.dataUrl + "/" + rideid+"/"+userid, {}).pipe(
      catchError(this.handleError('ride', {} as RidePosting[])));
  }
  
  // cancel ride status
  canceltheRide(userid: any,rideid:string): Observable<RidePosting[]> {
      return this.http.get<RidePosting[]>(this.dataUrl + "/ride/cancel/" + rideid+"/"+userid, {}).pipe(
        catchError(this.handleError('ride', {} as RidePosting[])));
    }

  // save a ride
  saveride(ridedata: any): Observable<Ride> {

    let ride = {
      from: ridedata.from,
      to: ridedata.to,
      date: ridedata.date,
      time: ridedata.time,
      seat: ridedata.seat,
      charge: ridedata.charge,
      id: localStorage.getItem('currentUser') //create a service instead
    }

    return this.http.post<Ride>(this.dataUrl, ride)
      .pipe(tap(data => console.log('data from ride save', data)),
        catchError(this.handleError('ride', {} as Ride)));
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error('handleError catched this error ', error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
