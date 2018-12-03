import { Injectable} from '@angular/core';
import {NgbTimeStruct, NgbTimeAdapter} from '@ng-bootstrap/ng-bootstrap';

/**
 * Example of a String Time adapter
 */
@Injectable()
export class NgbTimeStringAdapter extends NgbTimeAdapter<string> {

  fromModel(value: string): NgbTimeStruct {
    if (!value) {
      return null;
    }
    // const split = value.split(':');
    var date=new Date(value);
    // return {
    //   hour: parseInt(split[0], 10),
    //   minute: parseInt(split[1], 10),
    //   second: parseInt(split[2], 10)
    // };

     return {
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds()
    };
  }

  toModel(time: NgbTimeStruct): string {
    if (!time) {
      return null;
    }
    var date=new Date();
    var dateStr=date.getFullYear()+"-"+`${this.pad(date.getMonth()+1)}`+"-"+`${this.pad(date.getDate())}`+"T";
    return dateStr +`${this.pad(time.hour)}:${this.pad(time.minute)}:${this.pad(time.second)}`;
  }

  private pad(i: number): string {
    return i < 10 ? `0${i}` : `${i}`;
  }
}