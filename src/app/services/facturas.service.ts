import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CabFactura } from '../clase/CabFactura';
import { PosFactura } from '../clase/PosFactura';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {
  url_addf: string = "http://localhost:8099/addcabfactura";
  url_postf: string = "http://localhost:8099/addposfactura";
  url_correo: string = "http://localhost:8099/sendemail/";

  constructor(private http: HttpClient) { }
  public cabFactura: CabFactura[] = new Array;

  add_CabFactura(cab_factura: CabFactura): Observable <number> {
    return this.http.post<number>(this.url_addf, cab_factura);
  }

  add_PosFactura(pos_factura: PosFactura): Observable <number> {
    return this.http.post<number>(this.url_postf, pos_factura);
  }

  enviar_correo(id_factura: number): Observable <number> {
    return this.http.get<number>(this.url_correo + /*+ "/" +*/ id_factura);
  }

}
