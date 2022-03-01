import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Carrito } from '../clase/Carrito';
import { Login } from '../clase/Login';
import { Usuario } from '../clase/Usuario';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public initial: boolean = true;
  public carrito: Carrito[] = new Array();
  public mensajeLogin: string = "";
  public regUser: Usuario[] = new Array();


  constructor(
    private loginser: LoginService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.mensajeLogin = this.loginser.get_mensajico();
  }

  public formulario_usuario = new FormGroup({
    usuario: new FormControl('', Validators.required),
    password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4)])),
  })

  login(){
    this.initial= false;
    if(this.formulario_usuario.valid){
      this.loginser.login(new Usuario(
        this.formulario_usuario.get('usuario')?.value,
        this.formulario_usuario.get('password')?.value, '')).subscribe(codigo => {
          if(codigo == 0) {
            //subo el carrito y el usuario a la nube cuando inicio
            sessionStorage.setItem('carrito', JSON.stringify(this.carrito));
            sessionStorage.setItem('usu_logueado', JSON.stringify( this.formulario_usuario.get("usuario")?.value));
            
            this.loginser.set_islogueado(true);
            this.loginser.set_usuario(this.formulario_usuario.get('usuario')?.value);
            this.router.navigate(['/categorias']);
          } 
          if (codigo == 1) {
            this.mensajeLogin ="ese usuario no existe";
          } 
          if(codigo == 2) {
            this.mensajeLogin = "error en la password";
          }

        });
      this.initial= true;
    }
  }

  OnSelect(){
    this.router.navigate(['/registrar']);
  }

  
}
