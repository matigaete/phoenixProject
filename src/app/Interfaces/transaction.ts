import { DetalleFactura } from '../Interfaces/detalle-factura';

export interface Transaction {
    idpos: number;
    insert: boolean;
    detalle?: DetalleFactura; 
    dcto?: number; 
}