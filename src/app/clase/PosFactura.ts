export class PosFactura {
    constructor(
        public id_factura: number,
        public id_producto: number,
        public cantidad: number,
    ){   }
}
//tiendacapgemini@gmail.com Womanbootcamp    ng serve --host 0.0.0.0 --port 4200 
//Y luego en el explorador poneis la ip de la persona y detrás el puerto 4200 en ese caso