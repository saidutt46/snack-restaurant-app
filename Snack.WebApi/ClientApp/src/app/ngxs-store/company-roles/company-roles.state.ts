import { BaseDtoListResponse, BaseDtoResponse } from './../../models/base-response';
import { CompanyCustomRoleModel } from './../../models/company-role.model';
import { CompanyRoleService } from './../../services/company-role.service';
import { CompanyRoleStateModel } from './company-roles.model';
import { Action, State, Store, StateContext } from '@ngxs/store';
import { Inject, Injectable } from '@angular/core';
import { NOTIFICATION_SERV_TOKEN, NotificationService } from 'src/app/services';
import { CompanyRolesActions } from './company-roles.action';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@State<CompanyRoleStateModel>({
  name: 'companyRoles',
  defaults: {
    roles: [],
    pageLoading: false,
    formLoading: false,
    selectedRole: undefined
  }
})

@Injectable()
export class CompanyRoleState {
  constructor(
    private service: CompanyRoleService,
    @Inject(NOTIFICATION_SERV_TOKEN) private notifier: NotificationService,
    private store: Store
  ) { }

  @Action([CompanyRolesActions.ListAllCompanyRoles])
  getAllRoles({patchState}: StateContext<CompanyRoleStateModel>) {
    patchState({
      pageLoading: true
    });
    return this.service.getAllRoles().pipe(
      catchError((x) => {
        return throwError(x);
      }),
      tap((res: BaseDtoListResponse<CompanyCustomRoleModel>) => {
        if (res) {
          patchState({
            roles: res.payload,
            pageLoading: false
          });
        }
      })
    );
  }

  @Action([CompanyRolesActions.GetRoleById])
  getRoleById({patchState}: StateContext<CompanyRoleStateModel>, {payload}) {
    patchState({
      pageLoading: true
    });
    return this.service.getRoleById(payload).pipe(
      catchError((x) => {
        return throwError(x);
      }),
      tap((res: BaseDtoResponse<CompanyCustomRoleModel>) => {
        if (res) {
          patchState({
            selectedRole: res.payload,
            pageLoading: false
          });
        }
      })
    );
  }
}
