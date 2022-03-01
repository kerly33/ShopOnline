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
  }

  public formulario_usuario = new FormGroup({
    usuario: new FormControl('', Validators.required),
    password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4)])),
  })

  login(){
    this.initial= false;
    if(this.formulario_usuario.valid){
      this.initial= true;
    }
    let login: Login = new Login(
      this.formulario_usuario.get("usuario")?.value,
      this.formulario_usuario.get("password")?.value,
    )
    
    if(this.formulario_usuario.valid) {
      //subo el carrito y el usuario a la nube cuando inicio
      sessionStorage.setItem('carrito', JSON.stringify(this.carrito));
      sessionStorage.setItem('Registro', JSON.stringify(login));
      sessionStorage.setItem('usu_logueado', JSON.stringify( this.formulario_usuario.get("usuario")?.value));
      
      this.loginser.set_islogueado(true);
      this.router.navigate(['/categorias']);

      this.loginser.login(login).subscribe(mensaje => {
        if(mensaje == 0) {
          
          this.router.navigate(['/categorias']);
          
        }
        if (mensaje == 1) {
          this.mensajeLogin ="ese usuario no existe";
        }        
        if(mensaje == 2) {
          this.mensajeLogin = "error en la password";
        }
      })
    }
  }

  OnSelect(){
    this.router.navigate(['/registrar']);
  }

  
}
