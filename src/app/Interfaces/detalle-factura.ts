import { Producto } from './producto';
import { Servicio } from './servicio';

export interface DetalleFactura {
    dcto?: number,
    posicion?: number,
    insert?: boolean,
    tipo?: number,
    servicio?: Servicio,
    producto?: Producto,
    cantidad?: number,
    subtotal?: number,
}
