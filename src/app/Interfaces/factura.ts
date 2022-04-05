import { TipoFactura } from '../Utils/factura.constants';
import { DetalleFactura } from './detalle-factura';
import { Persona } from './persona';

export interface Factura {
    codFactura?: number,
    tipo?: TipoFactura,
    fecha?: string,
    hora?: string,
    persona?: Persona,
    detalle?: DetalleFactura[],
    neto?: number,
    iva?: number,
    total?: number,
}
