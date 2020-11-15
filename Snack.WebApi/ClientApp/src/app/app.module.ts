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
import { HomeComponent, LoginComponent, RegisterComponent, LobbyComponent, NavigationComponent } from './components';
import { NOTIFICATION_SERV_TOKEN, NotificationService } from './services';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { AuthAccessGuard } from './helpers/auth-guard';
import { ManagerialAccessGuard } from './helpers/managerial-acess-guard';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { ConsoleLoggingService, LOGGING_SERV_TOKEN } from './services/logging.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
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
    CategoriesAddComponent
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
    NgxsModule.forRoot([UserState, ManagerState, FoodCategoryState]),
    NgxsFormPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot({key: 'user'})
  ],
  entryComponents: [LoginComponent, RegisterComponent, UserProfileComponent, CategoriesAddComponent],
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
