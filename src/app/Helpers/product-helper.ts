import { Producto } from "../Interfaces/producto";

export class ProductHelper {
    static getValorAutomatico(product: Producto) {
		try {
			var percent = product.tasaCambio / 100;
			var pCompra = product.precioCompra[0].precio;
			product.precioVenta = pCompra + (pCompra * percent);
		} catch (error) {
            
		}
	}
}