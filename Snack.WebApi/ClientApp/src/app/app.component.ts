import { UserActions } from 'src/app/ngxs-store/user/user.action';
import { Store } from '@ngxs/store';
import { Component, HostBinding, OnInit } from '@angular/core';
import {OverlayContainer} from '@angular/cdk/overlay';
import { User } from 'oidc-client';

const THEME_DARKNESS_SUFFIX = `-dark`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  @HostBinding('class') activeThemeCssClass: string;
  isThemeDark = false;
  activeTheme: string;

  constructor(
    private store: Store,
    private overlayContainer: OverlayContainer
  ) {
    // Set default theme here:
    this.setActiveTheme('deeppurple-amber', /* darkness: */ false);
  }

  ngOnInit() {
    // const token = localStorage.getItem('token');
    // const id = localStorage.getItem('currentUser');
    // if (token && id) {
    //   this.store.dispatch(new UserActions.RefreshUserDetails(id));
    // }
  }

  setActiveTheme(theme: string, darkness: boolean = null) {
    if (darkness === null) {
      darkness = this.isThemeDark;
    } else if (this.isThemeDark === darkness) {
        if (this.activeTheme === theme) {
          return;
        }
    } else {
      this.isThemeDark = darkness;
    }

    this.activeTheme = theme;

    const cssClass = darkness === true ? theme + THEME_DARKNESS_SUFFIX : theme;

    const classList = this.overlayContainer.getContainerElement().classList;
    if (classList.contains(this.activeThemeCssClass)) {
      classList.replace(this.activeThemeCssClass, cssClass);
    } else {
      classList.add(cssClass);
    }
    this.activeThemeCssClass = cssClass;
  }

  toggleDarkness() {
    this.setActiveTheme(this.activeTheme, !this.isThemeDark);
  }

  updateTheme(e: string) {
    this.setActiveTheme(e, this.isThemeDark);
  }

  updateColorMode(e: boolean) {
    this.isThemeDark = e;
    this.setActiveTheme(this.activeTheme, this.isThemeDark);
  }
}
