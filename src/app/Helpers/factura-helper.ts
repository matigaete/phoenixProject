import { Factura } from "../Interfaces/factura";
import { TipoFactura } from "../Utils/factura.constants";
import { TipoProducto } from "../Utils/producto.constants";

export class FacturaHelper {
    static limpiaPosiciones(factura: Factura): Factura { 
        factura.detalle.forEach(det => {
            if (det.tipo == TipoProducto.Insumo) {
                det.servicio = undefined;
            } else {
                det.producto = undefined;
            }
        });
        return factura;
    }

    static getNetAmount(factura: Factura): number {
        try {
            if (factura.tipo == TipoFactura.FacturaCompra) {
                factura.neto = factura.detalle.map(t => (t.producto.precioCompra * t.cantidad) - ((t.producto.precioCompra * t.cantidad) * (t.dcto/100)))
                    .reduce((acc, value) => acc + value, 0);
            } else {
                factura.neto = factura.detalle.map((t) => {
                    var value = 0;
                    if (t.tipo == TipoProducto.Insumo) {
                        value = (t.producto.precioVenta * t.cantidad) - ((t.producto.precioVenta * t.cantidad) * (t.dcto/100));
                    } else {
                        value = t.servicio.precioVenta - t.dcto;
                    }
                    return value;
                }).reduce((acc, value) => acc + value, 0);
            }
        } catch (error) {
            factura.neto = 0;
        }
        if (factura.neto < 0) factura.neto = 0;
        return factura.neto;
    }

    static getIVA(factura: Factura): number {
        factura.iva = this.getNetAmount(factura) * 0.19;
        return factura.iva;
    }

    static getTotalCost(factura: Factura): number {
        factura.total = this.getNetAmount(factura) + this.getIVA(factura);
        return factura.total;
    }
}