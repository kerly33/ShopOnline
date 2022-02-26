import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Carrito } from '../clase/Carrito';
import { IProducto } from '../interfaz/Producto';
import { CategoriasService } from '../services/categorias.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  public id_producto: number = 0;
  public descripcion: string = "";
  public id_categoria: number = 0;
  public precio: number = 0;
  public cantidad: number = 0;

  public visible: boolean = false;
  public carrito: Carrito[] = new Array;
  public Iproducto: IProducto[] = new Array();

  constructor(
    private productoser: CategoriasService,
    private activaterouter: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activaterouter.paramMap.subscribe(
      (parametros: ParamMap) => {
        this.id_categoria = parseInt(parametros.get('id_categoria') || "");
        this.productoser.get_categ_prod(this.id_categoria).subscribe(pro_recibo =>
          this.Iproducto = pro_recibo);
      })
    this.carrito = JSON.parse(sessionStorage.getItem('carrito') || "{}");
  }

  /*add(i: number) {
    this.carrito.push(new Carrito(this.carrito[i].id_producto, this.carrito[i].descripcion, this.carrito[i].precio, this.cantidad));

    sessionStorage.setItem('carrito', JSON.stringify(this.carrito));
    if (this.carrito[i].cantidad >= 2) {
      this.carrito[i].cantidad == this.carrito[i].cantidad + 1;
      sessionStorage.setItem('carrito', JSON.stringify(this.carrito));
    }
  }*/

  add(i: number) {
    let existe: boolean = false; 
    for (let e = 0; e < this.carrito.length; e++){
      if(this.carrito[e].id_producto == this.Iproducto[i].id_producto){
        this.carrito[e].cantidad++;
        existe = true;
      }
    }
    if(!existe) {
      this.carrito.push(new Carrito(this.Iproducto[i].id_producto, this.Iproducto[i].descripcion, this.Iproducto[i].precio, 1));
    }
    sessionStorage.setItem('carrito', JSON.stringify(this.carrito));
  }

  ocultar() {
    if (this.visible) {
      this.visible = false;
    } else {
      this.visible = true;
    }
  }

  total(){
    let precio_total = 0;
    for(let t = 0; t < this.carrito.length; t++) {
      precio_total += (this.carrito[t].cantidad)*(this.carrito[t].precio)
    }
    return precio_total;
  }

  del(i: number) {
    if(this.carrito[i].cantidad > 1) {
      this.carrito[i].cantidad -- 
    } else{
      this.carrito.splice(i, 1);
    }
    sessionStorage.setItem('carrito', JSON.stringify(this.carrito)); //actualizar la nube
  }
}




