import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CabFactura } from '../clase/CabFactura';
import { Carrito } from '../clase/Carrito';
import { PosFactura } from '../clase/PosFactura';
import { IProducto } from '../interfaz/Producto';
import { CategoriasService } from '../services/categorias.service';
import { FacturasService } from '../services/facturas.service';

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
  public id_factura: number = 0;


  public visible: boolean = false;
  public carrito: Carrito[] = new Array;
  public Iproducto: IProducto[] = new Array();

  constructor(
    private productoser: CategoriasService,
    private activaterouter: ActivatedRoute,
    private factservice: FacturasService,
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


  add(i: number) {
    console.log("e")
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
  comprar(){
    let usu_logueado: string = "";
    //bajamos los datos de sesion del usuario
    usu_logueado = JSON.parse(sessionStorage.getItem('usu_logueado') || '{}'); //llamamos al usuario de la sesion
    let cabfactura: CabFactura = new CabFactura(usu_logueado);
    this.factservice.add_CabFactura(cabfactura).subscribe(id_factura =>{
      this.id_factura = id_factura;
      //console.log(id_factura)
     for(let c= 0; c < this.carrito.length ; c++) {
       let posfactura: PosFactura = new PosFactura(this.id_factura, this.carrito[c].id_producto, this.cantidad);
       this.factservice.add_PosFactura(posfactura).subscribe(retorno => {console.log(retorno)});
      }
      this.factservice.enviar_correo(id_factura).subscribe(retorno =>{console.log(retorno)})
      //el id_factura me manda un autonumerico para localizar esa factura
    })
  }
  


}




