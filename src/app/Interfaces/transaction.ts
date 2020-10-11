import { DetalleFactura } from '../Clases/detalle-factura';
import { Producto } from '../Clases/producto';

export interface Transaction {
    idpos: number;
    insert: boolean;
    detalle?: DetalleFactura; 
    dcto?: number; 
}