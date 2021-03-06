import { DateFormatPipe } from './pipes/data-format.pipe';
import { StatusTypePipe } from './pipes/status-type.pipe';
import { BooleanTypePipe } from './pipes/boolean-type.pipe';
import { TakeoutSelectionState } from './ngxs-store/takeout-selection/takeout-selection.state';
import { TakeoutSummaryComponent } from './components/takeout/takeout-summary/takeout-summary.component';
import { TakeoutSelectionComponent } from './components/takeout/takeout-selection/takeout-selection.component';
import { TakeoutComponent } from './components/takeout/takeout.component';
import { CustomTableToolsComponent } from './components/shared-components/custom-table-tools/custom-table-tools.component';
import { FoodItemState } from './ngxs-store/food-items/food-item.state';
import { UserAddComponent } from './components/user-management/user-add/user-add.component';
import { CompanyRoleState } from './ngxs-store/company-roles/company-roles.state';
import { UserEditComponent } from './components/user-management/user-edit/user-edit.component';
import { UserRegistrationComponent } from './components/user-management/user-registration/user-registration.component';
import { UsersTableComponent } from './components/user-management/users-table/users-table.component';
import { CategoriesAddComponent } from './components/categories-management/categories-add/categories-add.component';
import { CategoriesEditComponent } from './components/categories-management/categories-edit/categories-edit.component';
import { CategoriesTableComponent } from './components/categories-management/categories-table/categories-table.component';
import { CustomTableFilterComponent } from './components/shared-components/custom-table-filter/custom-table-filter.component';
import { CustomTableComponent, SortDirective } from './components/shared-components/custom-table/custom-table.component';
import { ContextHeaderComponent } from './components/context-header/context-header.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { LoadingBarComponent } from './components/loading-bar/loading-bar.component';
import { FoodCategoryState } from './ngxs-store/food-category/food-category.state';
import { ItemsManagementComponent } from './components/items-management/items-management.component';
import { CategoriesManagementComponent } from './components/categories-management/categories-management.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { ManagerState } from './ngxs-store/manager/manager.state';
import { ManagementComponent } from './components/management/management.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserState } from './ngxs-store/user/user.state';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { UiuxModule } from './modules/uiux.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ShippingModule } from './modules/shipping.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent, LoginComponent, LobbyComponent, NavigationComponent } from './components';
import { NOTIFICATION_SERV_TOKEN, NotificationService } from './services';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { AuthAccessGuard } from './helpers/auth-guard';
import { ManagerialAccessGuard } from './helpers/managerial-acess-guard';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { ConsoleLoggingService, LOGGING_SERV_TOKEN } from './services/logging.service';
import { ItemsAddComponent } from './components/items-management/items-add/items-add.component';
import { ItemsEditComponent } from './components/items-management/items-edit/items-edit.component';
import { ItemsTableComponent } from './components/items-management/items-table/items-table.component';
import { CategoryDetailComponent } from './components/categories-management/category-detail/category-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LobbyComponent,
    NavigationComponent,
    UserProfileComponent,
    ManagementComponent,
    UserManagementComponent,
    CategoriesManagementComponent,
    ItemsManagementComponent,
    LoadingBarComponent,
    LoadingSpinnerComponent,
    ContextHeaderComponent,
    CustomTableComponent,
    CustomTableFilterComponent,
    CategoriesTableComponent,
    SortDirective,
    CategoriesEditComponent,
    CategoriesAddComponent,
    UsersTableComponent,
    UserRegistrationComponent,
    UserEditComponent,
    UserAddComponent,
    ItemsTableComponent,
    ItemsEditComponent,
    ItemsAddComponent,
    CategoryDetailComponent,
    CustomTableToolsComponent,
    TakeoutComponent,
    TakeoutSelectionComponent,
    TakeoutSummaryComponent,
    BooleanTypePipe,
    StatusTypePipe,
    DateFormatPipe

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ShippingModule,
    RouterModule,
    FlexLayoutModule,
    UiuxModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([
      UserState,
      ManagerState,
      FoodCategoryState,
      CompanyRoleState,
      FoodItemState,
      TakeoutSelectionState
    ]),
    NgxsFormPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot({key: 'user'})
  ],
  entryComponents: [
    LoginComponent,
    UserProfileComponent,
    CategoriesAddComponent,
    UserAddComponent,
    ItemsAddComponent
  ],
  providers: [
    { provide: NOTIFICATION_SERV_TOKEN, useClass: NotificationService },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    ManagerialAccessGuard,
    AuthAccessGuard,
    { provide: LOGGING_SERV_TOKEN, useClass: ConsoleLoggingService },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
