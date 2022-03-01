import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  private usu: string = "admin";
  constructor (
    private loginser: LoginService,
    private router: Router,
    ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.loginser.get_islogueado() /*&& this.loginser.get_usuario() == this.usu*/) {
        this.loginser.set_mensajico(""); // mensahje
        return true;
      }else {
        this.router.navigate(['/']);
        this.loginser.set_mensajico("tiene que iniciar sesion");
        return false;
      }
  }
  
}
