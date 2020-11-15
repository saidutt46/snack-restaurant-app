import { LOGGING_SERV_TOKEN, ILoggingService } from './../../services/logging.service';
import { NOTIFICATION_SERV_TOKEN, INotificationService } from './../../services/notification.service';
import { Store } from '@ngxs/store';
import { Inject, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export class BaseComponent implements OnDestroy {
  protected unSubscribe: Subject<any> = new Subject();

  constructor(
    protected store: Store,
    @Inject(NOTIFICATION_SERV_TOKEN) protected notifier: INotificationService,
    @Inject(LOGGING_SERV_TOKEN) protected logger: ILoggingService

  ) { }

  ngOnDestroy(): void {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }
}
