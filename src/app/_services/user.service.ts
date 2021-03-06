import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user.model'
import { catchError, tap } from 'rxjs/operators'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { of } from 'rxjs'; // convert some data to observables
import { Res } from '../_models/response.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private dataUrl: string = 'http://localhost:3000/user' // Node js server path
  constructor(private http: HttpClient) { }

  login(userdata: any): Observable<Res> {
    return this.http.post<Res>(this.dataUrl + "/login", { email: userdata.email, password: userdata.password }).pipe(
    
    catchError(this.handleError('user login',userdata)));
  }

  signUp(userdata: any): Observable<Res> {

    return this.http.post<Res>(this.dataUrl, { name: userdata.signupName, email: userdata.signupEmail, password: userdata.signupPassword,wallet:userdata.signupWallet,mobileNumber:userdata.signupMobile })
      .pipe(
        catchError(this.handleError('user login', {} as Res)));
  }

  // update wallet 
  updateWallet(walletamount: any,user:string): Observable<any> {

    return this.http.post<any>(this.dataUrl+"/wallet", { wallet: walletamount,userid:user })
      .pipe(
        catchError(this.handleError('wallet update', {} as any)));
  }

  // to fetch user data on the basis of userid
  getUserData(userId: string): Observable<User> {

  //   const options = userId ?
  //  { params: new HttpParams().set('userid', userId) } : {};

    return this.http.get<User>(this.dataUrl+"/"+userId)
      .pipe(
        catchError(this.handleError('user data fetched', {} as User)));
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
