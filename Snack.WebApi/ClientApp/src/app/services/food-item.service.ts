import { FoodItemModel, FoodItemRequest } from './../models/food-item.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable, Pipe } from '@angular/core';
import { BaseDtoListResponse, BaseDtoResponse } from '../models/base-response';

@Injectable({
  providedIn: 'root'
})
export class FoodItemService {
  private apiUrl = `${environment.API_BASE_URL}/fooditem`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<BaseDtoListResponse<FoodItemModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<BaseDtoListResponse<FoodItemModel>>(`${this.apiUrl}`,
    { headers: headers});
  }

  getById(id: string): Observable<BaseDtoResponse<FoodItemModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<BaseDtoResponse<FoodItemModel>>(`${this.apiUrl}/${id}`,
    { headers: headers});
  }

  getItemsByCategory(id: string): Observable<BaseDtoListResponse<FoodItemModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<BaseDtoListResponse<FoodItemModel>>(`${this.apiUrl}/category/${id}`,
    { headers: headers});
  }

  create(model: FoodItemRequest): Observable<BaseDtoResponse<FoodItemModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<BaseDtoResponse<FoodItemModel>>(`${this.apiUrl}`, model, {headers: headers});
  }

  update(id: string, model: FoodItemRequest): Observable<BaseDtoResponse<FoodItemModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<BaseDtoResponse<FoodItemModel>>(`${this.apiUrl}/${id}`, model, {headers: headers});
  }

  delete(id: string): Observable<BaseDtoResponse<FoodItemModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<BaseDtoResponse<FoodItemModel>>(`${this.apiUrl}/${id}`,
    { headers: headers});
  }
}
