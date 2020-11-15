import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dateformat' })

export class DateFormatPipe extends DatePipe implements PipeTransform {

    public static readonly monthDayYearFormat = 'M/d/yyyy';

    // tslint:disable-next-line:variable-name
    transform(value: any, _args?: string, format: string = 'M/d/yyyy h:mm a'): any {
        return super.transform(value, format);
    }
}
