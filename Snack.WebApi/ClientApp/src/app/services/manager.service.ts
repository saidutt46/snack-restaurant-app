import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  private _jsonURL = '../../assets/manager-access.json';

  constructor(
    private http: HttpClient
  ) { }

  getManagerAccessItems() {
    return this.http.get(this._jsonURL);
  }
}
