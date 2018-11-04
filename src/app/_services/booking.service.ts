import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs'; // convert some data to observables
import { Booking } from '../_models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private dataUrl: string = 'http://localhost:3000/book' // Node js server path
  constructor(private http: HttpClient) { }


  // book a ride
  bookRide(bookingData: Booking): Observable<Booking> {

    let booking={
      seat:bookingData.seat,
      charge:bookingData.charge,
      userID:bookingData.userID,
      rideID:bookingData.rideID
    }

    console.log('booking in service before save',booking)

    return this.http.post<Booking>(this.dataUrl,booking)
      .pipe(tap(data=>console.log('data from booking service',data)),
        catchError(this.handleError('ride', {} as Booking)));
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
