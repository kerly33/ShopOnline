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
  public usu_existe: boolean = false;
  private islogueado: boolean = false;
  
  constructor(private http: HttpClient) { }

  //metodos
  login(user: Login): Observable<number> {
    return this.http.post<number>(this.url, user);
  }

  Registro(registro: Usuario): Observable<number> {
    this.usu_existe = true;
    return this.http.post<number>(this.url_reg, registro);
  }

  get_islogueado(){
    return this.islogueado;
  }

  set_islogueado(islogueado: boolean){
    this.islogueado = islogueado;
  }

}
