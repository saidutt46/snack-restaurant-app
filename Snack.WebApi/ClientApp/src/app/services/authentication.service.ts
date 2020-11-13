import { UserProfileModel } from './../models/user-profile.model';
import { LoginRequestModel, LoginResponseModel } from './../models/login.model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = `${environment.API_BASE_URL}/authentication`;
  currentUser: UserProfileModel;

  constructor(
    private http: HttpClient
  ) { }

  createAuthorizationHeader(headers: Headers) {
    const token = localStorage.getItem('token');
    headers.append('Authorization', token);
  }

  public login(model: LoginRequestModel): Observable<LoginResponseModel> {
    return this.http.post<LoginResponseModel>(`${this.apiUrl}/login`, model);
  }

  public logout(id: string): Observable<string> {
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post<string>(`${this.apiUrl}/logout/${id}`, {});
  }

  public getUserClaims(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/userclaims`);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token ? true : false;
  }

  public hasManagerialAccess(): boolean {
    const roles = this.getUserProfile().roles;
    if (roles.length > 0) {
      const hasAccess = roles.some(e => e === 'SuperUser' || 'Manager' || 'Admin');
      return hasAccess;
    }
    return false;
  }

  public updateUserProfile(model: UserProfileModel) {
    this.currentUser = model;
  }

  public clearProfile() {
    this.currentUser = undefined;
  }

  public getUserProfile(): UserProfileModel {
    return this.currentUser;
  }
}
