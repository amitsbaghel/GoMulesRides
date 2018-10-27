import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ride } from '../_models/ride.model'
import { catchError, tap } from 'rxjs/operators'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs'; // convert some data to observables

@Injectable({
  providedIn: 'root'
})
export class RideService {
  private dataUrl: string = 'http://localhost:3000/ride' // Node js server path
  constructor(private http: HttpClient) { }
  // getride(userdata: any): Observable<Ride> {
  //   return this.http.post<Ride>(this.dataUrl, { }).pipe(
  //   tap(data=>console.log('data from service',data)),
    
  //     catchError(this.handleError('ride',userdata)));
  // }

  saveride(ridedata: any): Observable<Ride> {

    let ride={
      from:ridedata.from,
      to:ridedata.to,
      date:ridedata.date,
      time:ridedata.time,
      seat:ridedata.seat,
      id:localStorage.getItem('currentUser') //create a service instead
    }

    console.log('data in servce',ride)

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
