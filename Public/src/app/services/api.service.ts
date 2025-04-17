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

  //Bejelentkezés cég
  companyLogin(table: string, user: object)
  {
    return this.http.post(`${this.server}/${table}/login`, user);
  }

//regisztráció
  register(table: string, user: object)
  {
    return this.http.post(`${this.server}/${table}/register`, user);
  }

//regisztráció cég
  companyReg(table: string, user: object)
  {
    return this.http.post(`${this.server}/${table}/register`, user);
  }

//Felhasználónév módosítás
  passord(table: string, id: string, data:object)
  {
    return this.http.post(`${this.server}/${table}/password/${id}`, data, this.tokenHeader());
  }


//Email módosítás
  email(table: string, id: string, data:object)
  {
    return this.http.post(`${this.server}/${table}/email/${id}`, data, this.tokenHeader());
  }

//Email módosítás
  username(table: string, id: string, data:object)
  {
    return this.http.post(`${this.server}/${table}/username/${id}`, data, this.tokenHeader() );
  }


 //Kategóriák

//összes kategória lekérése
  categories(table:string)
  {
    return this.http.get(`${this.server}/${table}/get`, this.tokenHeader());
  }


 //Események

//Esemény létrehozása
  newEvent(table: string, data: FormData)
  {
    return this.http.post(`${this.server}/${table}/newevent`, data, this.tokenHeader());
  }


//Összes esemény lekérése
  getEvents(table:string, )
  {
    return this.http.get(`${this.server}/${table}/get`, this.tokenHeader())
  }

//Esemény lekérése ID alapján
  getEventById(table:string, id:string)
  {
    return this.http.get(`${this.server}/${table}/get/${id}`, this.tokenHeader())
  }
}
