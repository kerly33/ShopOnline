import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Carrito } from '../clase/Carrito';
import { Usuario } from '../clase/Usuario';
import { ICategoria } from '../interfaz/Categoria';
import { CategoriasService } from '../services/categorias.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  public Icategoria: ICategoria[] = new Array();
  
  constructor(
    private categoriaser: CategoriasService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.categoriaser.get_categoria_cargado()) {
      this.Icategoria = this.categoriaser.get_categoria_datos()
    } else {
      this.categoriaser.get_categoria().subscribe(pro_recibo => {
        this.Icategoria = pro_recibo;
        this.categoriaser.set_categoria_datos(pro_recibo);
      })
    }
  }

  onSelect(c: ICategoria) {
    //console.log(c)
    this.router.navigate(['/productos', c.id_categoria]);
  }

  logout(){
    let regUserL: Usuario = new Usuario ("", "", "");
    let carritoL: Carrito [] = new Array();  //me lo creo nuevo vacío y reemplaza al anterior

    sessionStorage.setItem('usuario',JSON.stringify(regUserL));
    //subimos el carrito a la sesion
    sessionStorage.setItem('carrito',JSON.stringify(carritoL));

    this.router.navigate(['']);
  }
}
