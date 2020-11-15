import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'statusType'
})
@Injectable({
    providedIn: 'root'
})
export class StatusTypePipe implements PipeTransform {
    transform(value: number): string {
        switch (value) {
          case 1:
            return 'Pending';
          case 2:
            return 'Active';
          case 3:
            return 'Archived';
        }
    }
}
