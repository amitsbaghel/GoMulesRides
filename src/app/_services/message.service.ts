import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs'; // convert some data to observables
import { Message, MessageUser } from '../_models/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private dataUrl: string = 'http://localhost:5000/message'
  constructor(private http: HttpClient) { }

  // save a message
  saveMessage(message: Message): Observable<Message> {
      let messageVar={
      from:message.sentById,
      to:message.sentToId,
      text:message.message
    }

console.log('service',messageVar)
    return this.http.post<Message>(this.dataUrl,messageVar)
      .pipe(tap(data=>console.log('data from message service',data)),
        catchError(this.handleError('ride', {} as Message)));
  }

   // get all users who one chatted with
   getAllChatUserDetails(fromuserId: string,touserId: string): Observable<MessageUser[]> {
     console.log('getAllChatUserDetails',this.dataUrl+"/"+fromuserId+"/"+touserId)
    return this.http.get<MessageUser[]>(this.dataUrl+"/"+fromuserId+"/"+touserId,{})
      .pipe(
        catchError(this.handleError('ride', {} as MessageUser[])));
  }

  // get all user specific messages with TO user and FROM user. 
  getOnlyMsgbySentToUser(fromuserId: string,toUserId:string): Observable<Message[]> {

    console.log('getOnlyMsgbySentToUser ',this.dataUrl+"/messages/"+fromuserId+"/"+toUserId);
    return this.http.get<Message[]>(this.dataUrl+"/messages/"+fromuserId+"/"+toUserId,{})
      .pipe(
        catchError(this.handleError('messages', {} as Message[])));
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
