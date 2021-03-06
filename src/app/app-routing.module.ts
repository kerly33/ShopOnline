import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './categorias/categorias.component';
import { LoginGuard } from './guard/login.guard';
import { LoginComponent } from './login/login.component';
import { ProductosComponent } from './productos/productos.component';
import { RegistrarComponent } from './registrar/registrar.component';

const routes: Routes = [
  {path: '', component: LoginComponent },
  {path: 'categorias', component: CategoriasComponent, canActivate: [LoginGuard] },
  {path: 'productos/:id_categoria', component: ProductosComponent, canActivate: [LoginGuard] },
  {path: 'registrar', component: RegistrarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
