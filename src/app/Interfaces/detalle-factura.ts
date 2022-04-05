import { TipoProducto } from '../Utils/producto.constants';
import { Producto } from './producto';
import { Servicio } from './servicio';

export interface DetalleFactura {
    dcto?: number,
    posicion?: number,
    insert?: boolean,
    tipo?: TipoProducto,
    servicio?: Servicio,
    producto?: Producto,
    cantidad?: number,
    subtotal?: number,
}
