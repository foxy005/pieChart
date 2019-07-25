import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  
  private url='http://localhost:3000/data'
  constructor(private _http:HttpClient) { }

  public getData(){
    return this._http.get(this.url)
  }
}
