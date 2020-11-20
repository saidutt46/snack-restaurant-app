import { CompanyCustomRoleModel } from './../models/company-role.model';
import { BaseDtoListResponse, BaseDtoResponse } from './../models/base-response';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyRoleService {
  private apiUrl = `${environment.API_BASE_URL}/companyrole`;

  constructor(private http: HttpClient) { }

  getAllRoles(): Observable<BaseDtoListResponse<CompanyCustomRoleModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<BaseDtoListResponse<CompanyCustomRoleModel>>(`${this.apiUrl}`,
    { headers: headers});
  }

  getRoleById(id: string): Observable<BaseDtoResponse<CompanyCustomRoleModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<BaseDtoResponse<CompanyCustomRoleModel>>(`${this.apiUrl}/${id}`,
    { headers: headers});
  }

}
