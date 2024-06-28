import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

  transform(value: string): string {
    if (value && value.length === 8 && value.includes(':')) {
      const [hours, minutes] = value.split(':');
      return `${hours}:${minutes}`;
    }
    return value;
  }

}
