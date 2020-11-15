import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'boolType'
})
@Injectable({
    providedIn: 'root'
})
export class BooleanTypePipe implements PipeTransform {
    transform(value: boolean): string {
        return value ? 'Yes' : 'No';
    }
}
