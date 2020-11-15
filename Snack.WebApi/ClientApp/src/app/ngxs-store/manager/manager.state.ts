import { ManagerService } from './../../services/manager.service';
import { NotificationService, NOTIFICATION_SERV_TOKEN } from './../../services/notification.service';
import { ManagerStateModel, ManagerAccessModel } from './manager.model';
import { Action, State, StateContext } from '@ngxs/store';
import { Inject, Injectable } from '@angular/core';
import { ManagerActions } from './manager.action';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';


@State<ManagerStateModel>({
  name: 'manager',
  defaults: {
    accessData: null,
    selectedOption: undefined
  }
})

@Injectable()
export class ManagerState {
  constructor(
    @Inject(NOTIFICATION_SERV_TOKEN) private notifier: NotificationService,
    private managerService: ManagerService
  ) { }

  @Action(ManagerActions.ManagerAccessDetails)
  managerAccessData({patchState}: StateContext<ManagerStateModel>) {
    return this.managerService.getManagerAccessItems().pipe(
      catchError((x) => {
        return throwError(x);
      }),
      tap((res) => {
        if (res && res['manager-management'].length > 0) {
          const accessDataConverted: ManagerAccessModel[] = res['manager-management'];
          patchState({
            accessData: accessDataConverted
          });
        }
      })
    );
  }
}
