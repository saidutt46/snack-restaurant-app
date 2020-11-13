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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    LobbyComponent,
    NavigationComponent

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
    NgxsModule.forRoot([UserState]),
    NgxsFormPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  entryComponents: [LoginComponent, RegisterComponent],
  providers: [
    { provide: NOTIFICATION_SERV_TOKEN, useClass: NotificationService },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
