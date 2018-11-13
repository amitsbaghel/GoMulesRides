import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs'; // convert some data to observables

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private dataUrl: string = 'http://localhost:3000/upload' // Node js server path
  constructor(private http: HttpClient) { }


  // upload a file
  uploadfiles(fileuploads: FileList, itemname: string): Observable<any> {
    // let formData=new FormData()
    const formData: FormData = new FormData();
    for (var i = 0; i < fileuploads.length; i++) {
      var file = fileuploads[i]
      // Add the file to the request.
       formData.append('uploads[]', file, file.name) //keep it same as it is on Node end
    }
    formData.append('itemname',itemname)

   formData.forEach(data=>console.log('form data for each ',data)

   )

    return this.http.post<any>(this.dataUrl, formData)
      .pipe(tap(data => console.log('data from upload service', data)),
        catchError(this.handleError('ride', {} as any)));
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
