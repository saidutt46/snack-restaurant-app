import { FoodItemModel } from './../../models/food-item.model';
import { FoodCategoryService } from './../../services/food-category.service';
import { TakeoutSelectionStateModel } from './takeout-selection.model';
import { Action, State, Store, StateContext } from '@ngxs/store';
import { patch, append, removeItem } from '@ngxs/store/operators';
import { Inject, Injectable } from '@angular/core';
import { NOTIFICATION_SERV_TOKEN, NotificationService } from 'src/app/services';
import { FoodItemService } from 'src/app/services/food-item.service';
import { TakeoutSelectionActions } from './takeout-selection.action';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { BaseDtoListResponse } from 'src/app/models/base-response';
import { appendFile } from 'fs';

@State<TakeoutSelectionStateModel>({
  name: 'takeoutScreen',
  defaults: {
    itemsToDisplay: [],
    loading: false,
    currentSelection: []
  }
})

@Injectable()
export class TakeoutSelectionState {
  constructor(
    private itemService: FoodItemService,
    private categoryService: FoodCategoryService,
    @Inject(NOTIFICATION_SERV_TOKEN) private notifier: NotificationService,
    private store: Store
  ) { }

  @Action([TakeoutSelectionActions.GetAllItems])
  getAllItems({patchState}: StateContext<TakeoutSelectionStateModel>) {
    patchState({
      loading: true
    });
    return this.itemService.getAll().pipe(
      catchError((x) => {
        return throwError(x);
      }),
      tap((res: BaseDtoListResponse<FoodItemModel>) => {
        if (res) {
          patchState({
            itemsToDisplay: res.payload,
            loading: false
          });
        }
      })
    );
  }

  @Action([TakeoutSelectionActions.GetItemsByCategory])
  getItemsByCategory({patchState}: StateContext<TakeoutSelectionStateModel>, {payload}) {
    patchState({
      loading: true
    });
    return this.categoryService.getItemsByCategory(payload).pipe(
      catchError((x) => {
        return throwError(x);
      }),
      tap((res: BaseDtoListResponse<FoodItemModel>) => {
        if (res) {
          patchState({
            itemsToDisplay: res.payload,
            loading: false
          });
        }
      })
    );
  }

  @Action([TakeoutSelectionActions.UpdateItemsSelection])
  updateItemsCatalog(ctx: StateContext<TakeoutSelectionStateModel>, {payload}) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      currentSelection: {...state.currentSelection, ...payload}
    });
  }

  @Action([TakeoutSelectionActions.RemoveItemsSelection])
  removeItemsFromCatalog(ctx: StateContext<TakeoutSelectionStateModel>, {payload}) {
    const state = ctx.getState();
    ctx.setState(
      patch({
        currentSelection: removeItem<FoodItemModel>(x => x.id === payload.id)
      })
    );
  }

}

