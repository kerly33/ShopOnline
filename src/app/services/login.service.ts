import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../clase/Login';
import { Usuario } from '../clase/Usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url: string = "http://localhost:8099/loginuser";
  url_reg: string = "http://localhost:8099/adduser";
  public Login: Login[] = new Array();
  
  constructor(private http: HttpClient) { }

  login(user: Login): Observable<number> {
    return this.http.post<number>(this.url, user);
  }

  Registro(user: Usuario): Observable<number> {
    return this.http.post<number>(this.url_reg, user);
  }
}
