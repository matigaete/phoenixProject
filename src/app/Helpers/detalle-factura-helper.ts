import { DetalleFactura } from "../Interfaces/detalle-factura";
import { TipoFactura } from "../Utils/factura.constants";
import { TipoProducto } from "../Utils/producto.constants";

export class DetalleFacturaHelper {

    static getSubtotal(detalle: DetalleFactura, tipo: TipoFactura): number {
        detalle.dcto <= 100 ? detalle.dcto : detalle.dcto = 100;
        if (tipo == TipoFactura.Compra) {
            var precio = detalle.producto.precioCompra;
        } else {
            if (detalle.tipo == TipoProducto.Insumo) {
                precio = detalle.producto.precioVenta;
            } else {
                precio = detalle.servicio.precioVenta;
            }
        }
        try {
            var subtotal = (detalle.cantidad * precio) - ((detalle.cantidad * precio) * (detalle.dcto/100));
        } catch (error) {
            subtotal = 0
        }
        if (subtotal < 0) subtotal = 0;
        detalle.subtotal = subtotal;
        return detalle.subtotal;
    }
    
}