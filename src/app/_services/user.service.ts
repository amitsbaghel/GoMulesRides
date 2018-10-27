import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user.model'
import { catchError, tap } from 'rxjs/operators'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs'; // convert some data to observables

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private dataUrl: string = 'http://localhost:3000/user' // Node js server path
  constructor(private http: HttpClient) { }

  login(userdata: any): Observable<User> {
    // https://stackblitz.com/angular/ggooaknoppr?file=src%2Fapp%2Fheroes%2Fheroes.component.ts
    return this.http.post<User>(this.dataUrl + "/login", { email: userdata.email, password: userdata.password }).pipe(
    tap(data=>console.log('data from service',data)),
    
      catchError(this.handleError('user login',userdata)));
  }

  signUp(userdata: any): Observable<User> {

    return this.http.post<User>(this.dataUrl, { name: userdata.signupEmail, email: userdata.signupEmail, password: userdata.signupPassword })
      .pipe(
        catchError(this.handleError('user login', {} as User)));
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
