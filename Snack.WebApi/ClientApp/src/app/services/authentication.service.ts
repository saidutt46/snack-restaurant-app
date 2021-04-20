import { UserRegisterModel } from './../models/requests/user-register.model';
import { UserProfileUpdateRequestModel } from './../models/requests/user-profile-update';
import { UserProfileModel } from './../models/user-profile.model';
import { LoginRequestModel, LoginResponseModel } from './../models/login.model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthBaseResponse } from '../models/base-response';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = `${environment.API_BASE_URL}/user`;
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

  public registerUser(model: UserRegisterModel): Observable<AuthBaseResponse> {
    // const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<AuthBaseResponse>(`${this.apiUrl}/register`, model, {headers: headers});
  }

  public logout(id: string): Observable<string> {
    const headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.http.post<string>(`${this.apiUrl}/logout/${id}`, {});
  }

  public getUserProfileById(id: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrl}/${id}`,
    { headers: headers});
  }

  public getAllUsers() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrl}/listall`,
    { headers: headers});
  }

  public updateUserProfile(id: string, model: UserProfileUpdateRequestModel): Observable<UserProfileModel> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<UserProfileModel>(`${this.apiUrl}/${id}`, model,
    { headers: headers});
  }

  public deleteUser(id: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`${this.apiUrl}/${id}`,
    { headers: headers});
  }


}
