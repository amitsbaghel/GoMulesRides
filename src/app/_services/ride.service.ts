import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ride, RideDetails } from '../_models/ride.model'
import { catchError, tap } from 'rxjs/operators'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs'; // convert some data to observables

@Injectable({
  providedIn: 'root'
})
export class RideService {
  private dataUrl: string = 'http://localhost:3000/ride' // Node js server path
  constructor(private http: HttpClient) { }


  // get all rides
  getrides(userdata: any): Observable<RideDetails[]> {
    return this.http.get<RideDetails[]>(this.dataUrl, {}).pipe(
      catchError(this.handleError('ride',userdata)));
  }


  // save a ride
  saveride(ridedata: any): Observable<Ride> {

    let ride={
      from:ridedata.from,
      to:ridedata.to,
      date:ridedata.date,
      time:ridedata.time,
      seat:ridedata.seat,
      charge:ridedata.charge,
      id:localStorage.getItem('currentUser') //create a service instead
    }

    return this.http.post<Ride>(this.dataUrl,ride)
      .pipe(tap(data=>console.log('data from ride save',data)),
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
      console.error('handleError catched this error ',error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
