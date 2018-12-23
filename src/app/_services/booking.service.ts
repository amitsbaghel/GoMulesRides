import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs'; // convert some data to observables
import { Booking, BookingDetails } from '../_models/booking.model';
import { RidePosting } from '../_models/ride.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private dataUrl: string = 'http://localhost:3000/book' // Node js server path
  constructor(private http: HttpClient) { }


  // book a ride
  bookRide(bookingData: Booking): Observable<RidePosting[]> {

    let booking={
      seat:bookingData.seat,
      charge:bookingData.charge,
      userID:bookingData.userID,
      rideID:bookingData.rideID
    }

    return this.http.post<RidePosting[]>(this.dataUrl,booking)
      .pipe(tap(data=>console.log('data from booking service',data)),
        catchError(this.handleError('ride', {} as RidePosting[])));
  }


   // book a ride
   getrides(userid: string): Observable<BookingDetails[]> {

    return this.http.get<BookingDetails[]>(this.dataUrl+"/"+userid,{})
      .pipe(
        catchError(this.handleError('ride', {} as BookingDetails[])));
  }

  // update ride rating
  updateRating(userid:string,bookingID: string,rating:number,comment:string): Observable<BookingDetails[]> {

    return this.http.get<BookingDetails[]>(this.dataUrl+"/"+userid+"/"+bookingID+"/"+rating+"/"+comment,{})
      .pipe(
        catchError(this.handleError('ride', {} as BookingDetails[])));
  }

  
    // cancel ride by ride booking user
    cancelBooking(userid:string,bookingID: string): Observable<BookingDetails[]> {
      return this.http.get<BookingDetails[]>(this.dataUrl+"/cancel/"+userid+"/"+bookingID,{})
        .pipe(
          catchError(this.handleError('ride', {} as BookingDetails[])));
    }

    // mark the booking no show up
    markBookingNoShowUp(bookingid:string,rideid:string): Observable<BookingDetails[]> {
      // update path here
      console.log(this.dataUrl + "/no/show/up/bybooker/" + rideid+"/"+bookingid);
      return this.http.get<BookingDetails[]>(this.dataUrl + "/no/show/up/bybooker/" + rideid+"/"+bookingid, {}).pipe(
        catchError(this.handleError('booking details', {} as BookingDetails[])));
    }

   //get bookings by ride Id
   getbookingsbyRideId(rideid: any): Observable<BookingDetails[]> {
     //console.log('this.dataUrl + "/ride/" + rideid',this.dataUrl + "/ride/" + rideid)
    return this.http.get<BookingDetails[]>(this.dataUrl + "/ride/" + rideid, {}).pipe(
      catchError(this.handleError('booking', {} as BookingDetails[])));
  }

  //get bookings by ride Id without cancelled rides
  getbookingsbyRideIdNotCancelled(rideid: any): Observable<BookingDetails[]> {
    console.log(this.dataUrl + "/ride/not/cancelled/complete/" + rideid);
   return this.http.get<BookingDetails[]>(this.dataUrl + "/ride/not/cancelled/complete/" + rideid, {}).pipe(
     catchError(this.handleError('booking', {} as BookingDetails[])));
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
      console.error('handleError catched this error ',error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
