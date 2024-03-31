import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'elipsis',
  standalone: true
})
export class ElipsisPipe implements PipeTransform {

  transform(value: string, maxLength:number): string {
    if (value.length > 20) {
      console.log(value);

      return value.substring(0, 20) + '...';
    } else {
      return value;
    }
  }

}
