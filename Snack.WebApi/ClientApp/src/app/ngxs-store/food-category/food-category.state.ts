import { NOTIFICATION_SERV_TOKEN, NotificationService } from './../../services/notification.service';
import { FoodCategoryModel } from './../../models/food-category.model';
import { BaseDtoListResponse, BaseDtoResponse } from './../../models/base-response';
import { FoodCategoryService } from './../../services/food-category.service';
import { FoodCategoryStateModel } from './food-category.model';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { Inject, Injectable } from '@angular/core';
import { FoodCategoryActions } from './food-category.action';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { loadavg } from 'os';

@State<FoodCategoryStateModel>({
  name: 'foodCategory',
  defaults: {
    allCategoris: [],
    selectedCategory: undefined,
    loading: false,
    formLoading: false
  }
})

@Injectable()
export class FoodCategoryState {
  constructor(
    private categoryService: FoodCategoryService,
    @Inject(NOTIFICATION_SERV_TOKEN) private notifier: NotificationService,
    private store: Store
  ) { }

  @Action([FoodCategoryActions.ListAllCategories])
  getAllCategories({patchState}: StateContext<FoodCategoryStateModel>) {
    patchState({
      loading: true
    });
    return this.categoryService.getAllCategories().pipe(
      catchError((x) => {
        return throwError(x);
      }),
      tap((res: BaseDtoListResponse<FoodCategoryModel>) => {
        if (res) {
          patchState({
            allCategoris: res.payload,
            loading: false
          });
          this.notifier.successNotification(`Sucessfully retrieved food categories`);
        }
      })
    );
  }

  @Action([FoodCategoryActions.GetCategoryById])
  getCategoryById({patchState}: StateContext<FoodCategoryStateModel>, {payload}) {
    patchState({
      loading: true
    });
    return this.categoryService.getCategoryById(payload).pipe(
      catchError((x) => {
        return throwError(x);
      }),
      tap((res: BaseDtoResponse<FoodCategoryModel>) => {
        if (res) {
          patchState({
            selectedCategory: res.payload,
            loading: false
          });
          this.notifier.successNotification(`Sucessfully retrieved food category`);
        }
      })
    );
  }

  @Action([FoodCategoryActions.CreateCategory])
  createCategory({patchState}: StateContext<FoodCategoryStateModel>, {payload}) {
    patchState({
      loading: true,
      formLoading: true
    });
    return this.categoryService.createCategory(payload).pipe(
      catchError((x) => {
        return throwError(x);
      }),
      tap((res: BaseDtoResponse<FoodCategoryModel>) => {
        if (res) {
          patchState({
            selectedCategory: res.payload,
            loading: false,
            formLoading: false
          });
          this.notifier.successNotification(`Sucessfully created food categories`);
          this.store.dispatch(new FoodCategoryActions.ListAllCategories());
        }
      })
    );
  }

  @Action([FoodCategoryActions.UpdateCategory])
  updateCategory({patchState}: StateContext<FoodCategoryStateModel>, {payload, id}) {
    patchState({
      loading: true
    });
    return this.categoryService.updateCategory(id, payload).pipe(
      catchError((x) => {
        return throwError(x);
      }),
      tap((res: BaseDtoResponse<FoodCategoryModel>) => {
        if (res) {
          patchState({
            selectedCategory: res.payload,
            loading: false
          });
          this.notifier.successNotification(`Sucessfully retrieved food categories`);
          this.store.dispatch(new FoodCategoryActions.ListAllCategories());
        }
      })
    );
  }

  @Action([FoodCategoryActions.DeleteCategory])
  deleteCategory({patchState}: StateContext<FoodCategoryStateModel>, { payload }) {
    patchState({
      loading: true
    });
    return this.categoryService.deleteCategory(payload).pipe(
      catchError((x) => {
        return throwError(x);
      }),
      tap((res: BaseDtoResponse<FoodCategoryModel>) => {
        if (res) {
          patchState({
            loading: false
          });
          this.notifier.successNotification(`Sucessfully retrieved food categories`);
          this.store.dispatch(new FoodCategoryActions.ListAllCategories());
        }
      })
    );
  }
}

