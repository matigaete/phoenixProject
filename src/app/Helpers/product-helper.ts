import { Producto } from '../Interfaces/producto';

export class ProductHelper {
  static getValorAutomatico(product: Producto) {
    try {
      const percent = product.tasaCambio / 100;
      const pCompra = product.precioCompra[0].precio;
      product.precioVenta = pCompra + (pCompra * percent);
    } catch (error) {
      console.log(error);
    }
  }
}