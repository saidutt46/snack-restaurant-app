import { BaseDtoListResponse, BaseDtoResponse } from './../models/base-response';
import { FoodCategoryModel, FoodCategoryCreateRequest } from './../models/food-category.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { FoodItemModel } from '../models/food-item.model';

@Injectable({
  providedIn: 'root'
})
export class FoodCategoryService {
  private apiUrl = `${environment.API_BASE_URL}/foodcategory`;

  constructor(private http: HttpClient) { }

  createAuthorizationHeader(headers: HttpHeaders) {
    const token = localStorage.getItem('token');
    console.warn(token);
    headers.set('Content-Type', 'application/json');
    headers.set('Authorization', `Bearer ${token}`);
    console.warn(headers);
  }

  getAllCategories(): Observable<BaseDtoListResponse<FoodCategoryModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<BaseDtoListResponse<FoodCategoryModel>>(`${this.apiUrl}`,
    { headers: headers});
  }

  getCategoryById(id: string): Observable<BaseDtoResponse<FoodCategoryModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<BaseDtoResponse<FoodCategoryModel>>(`${this.apiUrl}/${id}`,
    { headers: headers});
  }

  getItemsByCategory(id: string): Observable<BaseDtoListResponse<FoodItemModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<BaseDtoListResponse<FoodItemModel>>(`${this.apiUrl}/${id}/items`,
    { headers: headers});
  }

  createCategory(model: FoodCategoryCreateRequest): Observable<BaseDtoResponse<FoodCategoryModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<BaseDtoResponse<FoodCategoryModel>>(`${this.apiUrl}`, model, {headers: headers});
  }

  updateCategory(id: string, model: FoodCategoryCreateRequest): Observable<BaseDtoResponse<FoodCategoryModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<BaseDtoResponse<FoodCategoryModel>>(`${this.apiUrl}/${id}`, model, {headers: headers});
  }

  deleteCategory(id: string): Observable<BaseDtoResponse<FoodCategoryModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<BaseDtoResponse<FoodCategoryModel>>(`${this.apiUrl}/${id}`,
    { headers: headers});
  }

}
