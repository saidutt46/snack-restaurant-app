import { BaseDtoListResponse, BaseDtoResponse } from './../../models/base-response';
import { FoodItemModel } from './../../models/food-item.model';
import { FoodItemService } from './../../services/food-item.service';
import { FoodItemStateModel } from './food-item.model';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { Inject, Injectable } from '@angular/core';
import { NOTIFICATION_SERV_TOKEN, NotificationService } from 'src/app/services';
import { FoodItemActions } from './food-item.action';

@State<FoodItemStateModel>({
  name: 'foodItem',
  defaults: {
    allItems: [],
    selectedItem: undefined,
    loading: false,
    formLoading: false
  }
})

@Injectable()
export class FoodItemState {
  constructor(
    private service: FoodItemService,
    @Inject(NOTIFICATION_SERV_TOKEN) private notifier: NotificationService,
    private store: Store
  ) { }

  @Action([FoodItemActions.ListAllItems])
  getAllItems({patchState}: StateContext<FoodItemStateModel>) {
    patchState({
      loading: true
    });
    return this.service.getAll().pipe(
      catchError((x) => {
        return throwError(x);
      }),
      tap((res: BaseDtoListResponse<FoodItemModel>) => {
        if (res) {
          patchState({
            allItems: res.payload,
            loading: false
          });
        }
      })
    );
  }

  @Action([FoodItemActions.GetItemById])
  getItemById({patchState}: StateContext<FoodItemStateModel>, {payload}) {
    patchState({
      loading: true
    });
    return this.service.getById(payload).pipe(
      catchError((x) => {
        return throwError(x);
      }),
      tap((res: BaseDtoResponse<FoodItemModel>) => {
        if (res) {
          patchState({
            selectedItem: res.payload,
            loading: false
          });
          this.notifier.successNotification(`Sucessfully retrieved food item`);
        }
      })
    );
  }

  @Action([FoodItemActions.CreateItem])
  createItem({patchState}: StateContext<FoodItemStateModel>, {payload}) {
    patchState({
      formLoading: true
    });
    return this.service.create(payload).pipe(
      catchError((x) => {
        return throwError(x);
      }),
      tap((res: BaseDtoResponse<FoodItemModel>) => {
        if (res) {
          patchState({
            selectedItem: res.payload,
            formLoading: false
          });
          this.notifier.successNotification(`Sucessfully created food item: ${res.payload.name}`);
          this.store.dispatch(new FoodItemActions.ListAllItems());
        }
      })
    );
  }

  @Action([FoodItemActions.UpdateItem])
  updateItem({patchState}: StateContext<FoodItemStateModel>, {id, payload}) {
    patchState({
      loading: true
    });
    return this.service.update(id, payload).pipe(
      catchError((x) => {
        return throwError(x);
      }),
      tap((res: BaseDtoResponse<FoodItemModel>) => {
        if (res) {
          patchState({
            selectedItem: res.payload,
            loading: false
          });
          this.notifier.successNotification(`Sucessfully updated food items: ${res.payload.name}`);
          this.store.dispatch(new FoodItemActions.ListAllItems());
        }
      })
    );
  }

  @Action([FoodItemActions.DeleteItem])
  deleteItem({patchState}: StateContext<FoodItemStateModel>, { payload }) {
    patchState({
      loading: true
    });
    return this.service.delete(payload).pipe(
      catchError((x) => {
        return throwError(x);
      }),
      tap((res: BaseDtoResponse<FoodItemModel>) => {
        if (res) {
          patchState({
            loading: false
          });
          this.notifier.successNotification(`Sucessfully deleted food item: ${res.payload.name}`);
          this.store.dispatch(new FoodItemActions.ListAllItems());
        }
      })
    );
  }
}

