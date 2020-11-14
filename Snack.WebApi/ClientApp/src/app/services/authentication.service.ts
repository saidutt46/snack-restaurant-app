import { UserProfileModel } from './../models/user-profile.model';
import { LoginRequestModel, LoginResponseModel } from './../models/login.model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  createAuthorizationHeader(headers: HttpHeaders) {
    const token = localStorage.getItem('token');
    console.warn(token);
    headers.set('Content-Type', 'application/json');
    headers.set('Authorization', `Bearer ${token}`);
    console.warn(headers);
  }

  public login(model: LoginRequestModel): Observable<LoginResponseModel> {
    return this.http.post<LoginResponseModel>(`${this.apiUrl}/login`, model);
  }

  public logout(id: string): Observable<string> {
    const headers = new HttpHeaders();
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

  public getUserProfileById(id: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrl}/userprofile/${id}`,
    { headers: headers});
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
