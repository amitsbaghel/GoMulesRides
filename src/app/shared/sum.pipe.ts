import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'sum'})
export class SumPipe implements PipeTransform {
  transform(arrSum: Array<any>, fieldtoSum: string): number {
    let sum=0
    arrSum.forEach(element => {
        sum+= parseInt(element[fieldtoSum])
    });
    return sum; 
  }
}