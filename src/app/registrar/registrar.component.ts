import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../clase/Usuario';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  public initial: boolean = true;
  public mensajeRegistro: string = "";
  public regUser: Usuario[] = new Array();


  constructor(
    private loginser: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  public formulario_registro = new FormGroup({
    usuario: new FormControl('', Validators.required),
    password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4)])),
    password2: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4)])),
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),

  })

  gestion_registro(){
     this.initial = false;
     if(this.formulario_registro.valid) {
       if(this.formulario_registro.get('password')?.value == this.formulario_registro.get('password2')?.value){
       let User: Usuario = new Usuario(
         this.formulario_registro.get('usuario')?.value, 
         this.formulario_registro.get('password')?.value,
         this.formulario_registro.get('email')?.value);
          this.regUser.push(User)

        this.loginser.Registro(User).subscribe(mensaje => {
          if(mensaje == 0) {
            this.mensajeRegistro = "usuario añadido";
          } 
          else 
          if (mensaje == 1) {
            this.mensajeRegistro = "usuario ya existe";
          }
        })

      }
    }
  }

  
}
