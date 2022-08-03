import { Servicio } from './servicio';

export interface Producto extends Servicio {
    categoria?: number | string,
    stock?: number,
    stockCritico?: number,
    precioCompra?: number,
    tasaCambio?: number,
    activo?: boolean
}
