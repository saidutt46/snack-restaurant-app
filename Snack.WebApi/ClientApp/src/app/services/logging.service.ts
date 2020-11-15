import { Injectable, InjectionToken } from '@angular/core';

export let LOGGING_SERV_TOKEN = new InjectionToken('LoggingServiceImpl');

export interface ILoggingService {
    log(msg?: any): void;
    error(msg?: any): void;
    warn(msg?: any): void;
    info(msg?: any): void;
    trace(msg?: any): void;
}

// tslint:disable:no-console
@Injectable({
    providedIn: 'root'
})
export class ConsoleLoggingService implements ILoggingService {
    public log(msg?: any): void  {
        if (msg) {
            console.log(msg);
        }
    }

    public error(msg?: any): void  {
        if (msg) {
            console.error(msg);
        }
    }

    public warn(msg?: any): void  {
        if (msg) {
            console.warn(msg);
        }
    }

    public info(msg?: any): void  {
        if (msg) {
            console.info(msg);
        }
    }

    public trace(msg?: any): void {
        if (msg) {
            console.trace(msg);
        }
    }
}
