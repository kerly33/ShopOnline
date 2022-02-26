import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategoria } from '../interfaz/Categoria';
import { IProducto } from '../interfaz/Producto';


@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  url : string = "http://localhost:8099/categorias";
  url_categ_prod: string = "http://localhost:8099/productos/"

  ICategoria: ICategoria[] = new Array();
  categoria_cargado: boolean = false;

  IProducto : IProducto[] = new Array();
  categ_prod_cargado: boolean = false;


  constructor(
    private http: HttpClient
  ) { }

  get_categoria(): Observable<ICategoria[]> {
    this.categoria_cargado = true;
    return this.http.get<ICategoria[]>(this.url);
  }

  get_categoria_cargado() {
    return this.categoria_cargado;
  }

  get_categoria_datos() {
    return this.ICategoria;
  }

  set_categoria_datos(categorias: ICategoria[]) {
    this.ICategoria = categorias;
  }




  get_categ_prod(id_categoria: number): Observable<IProducto[]> {
 
    return this.http.get<IProducto[]>(this.url_categ_prod + id_categoria);
  }


}
