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

  //Bejelentkezés
  login(table: string, user: object)
  {
    return this.http.post(`${this.server}/${table}/login`, user);
  }


  //regisztráció
  register(table: string, user: object)
  {
    return this.http.post(`${this.server}/${table}/register`, user);
  }

   //Felhasználónév módosítás
  passord(table: string, id: string, data:object)
  {
    return this.http.post(`${this.server}/${table}/password/${id}`, this.tokenHeader, data);
  }


 //Email módosítás
  email(table: string, id: string, data:object)
  {
    return this.http.post(`${this.server}/${table}/email/${id}`, this.tokenHeader, data);
  }

 //Email módosítás
 username(table: string, id: string, data:object)
 {
   return this.http.post(`${this.server}/${table}/username/${id}`, this.tokenHeader, data);
 }
}
