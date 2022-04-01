export interface Producto {
    codigo?: number | string,
    categoria?: number | string,
    nombre?: string;
    descripcion?: string,
    stock?: number,
    stockCritico?: number,
    precioCompra?: number,
    precioVenta?: number,
    tasaCambio?: number,
    activo?: boolean
}
