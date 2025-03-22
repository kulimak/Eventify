import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }

  server = `http://localhost:3000/api`;

  getToken():String | null{
    return localStorage.getItem(environment.tokenName);
  }

  tokenHeader(){
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return { headers }
  }

  login(table: string, user: object)
  {
    return this.http.post(`${this.server}/${table}/login`, user);
  }

  register(table: string, user: object)
  {
    return this.http.post(`${this.server}/${table}/register`, user);
  }
}
