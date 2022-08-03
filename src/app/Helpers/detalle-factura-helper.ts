import { DetalleFactura } from '../Interfaces/detalle-factura';
import { TipoFactura } from '../Utils/factura.constants';
import { TipoProducto } from '../Utils/producto.constants';

export class DetalleFacturaHelper {

  static getSubtotal(detalle: DetalleFactura, tipo: TipoFactura): number {
    let precio: number;
    detalle.dcto = detalle.dcto <= 100 ? detalle.dcto : 100;
    if (tipo == TipoFactura.FacturaCompra) {
      precio = detalle.producto.precioCompra;
    } else {
      if (detalle.tipo == TipoProducto.Insumo) {
        precio = detalle.producto.precioVenta;
      } else {
        precio = detalle.servicio.precioVenta;
      }
    }
    try {
      detalle.subtotal = (detalle.cantidad * precio) - ((detalle.cantidad * precio) * (detalle.dcto/100));
    } catch (error) {
      detalle.subtotal = 0;
    }
    return detalle.subtotal < 0 ? 0 : detalle.subtotal;
  }
    
}