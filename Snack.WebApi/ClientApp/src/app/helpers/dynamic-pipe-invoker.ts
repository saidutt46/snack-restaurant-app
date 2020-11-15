import { DatePipe } from '@angular/common';
import { Injectable, Injector } from '@angular/core';
import { StatusTypePipe, BooleanTypePipe, DateFormatPipe } from '../pipes';

@Injectable({
    providedIn: 'root'
})
export class DynamicPipeInvoker {
    public static readonly pipeMap = {
        date: DateFormatPipe,
        statusType: StatusTypePipe,
        booleanType: BooleanTypePipe,
        datePipe: DatePipe,
    };

    public static readonly pipeList = Object.keys(DynamicPipeInvoker.pipeMap).map(itm => DynamicPipeInvoker.pipeMap[itm]);

    constructor(private injector: Injector) {
    }

    transform(value: any, pipeTokensAndArgs: string): any {
        let result = value;
        if (!pipeTokensAndArgs) {
            return result;
        }

        const pipeTokens = pipeTokensAndArgs.split('|');
        pipeTokens.forEach(pipeToken => {
            pipeToken = pipeToken.trim();
            const tokenAndArgs = pipeToken.split(':');
            const pipeName = tokenAndArgs[0];
            // tslint:disable-next-line: deprecation
            const pipe = this.injector.get(DynamicPipeInvoker.pipeMap[pipeName]);
            const pipeArgs = tokenAndArgs.length > 1 ? tokenAndArgs.slice(1) : [];
            result = pipe.transform(result, ...pipeArgs);
        });

        return result;
    }
}
