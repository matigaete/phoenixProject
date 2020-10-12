import { Producto } from './producto';
import { Servicio } from './servicio';

export class DetalleFactura {

    constructor(private _posicion: number,
        private _cantidad: number,
        private _subtotal: number,
        private _tipo: string,
        private _insert?: boolean,
        private _dcto?: number,
        private _producto?: Producto,
        private _servicio?: Servicio) {
        this._posicion = _posicion;
        this._cantidad = _cantidad;
        this._subtotal = _subtotal;
        this._producto = _producto;
        this._insert = _insert;
        this._dcto = _dcto;
    }

    public getSubtotal(tipo: string): number {
        if (tipo == 'C') {
            var precio = this.producto.precioCompra;
        } else {
            if (this.tipo == 'P') {
                precio = this.producto.precioVenta;
            } else {
                precio = this.servicio.precioVenta;
            }
        }
        try {
            var subtotal = (this.cantidad * precio) - this.dcto;
        } catch (error) {
            subtotal = 0
        }
        if (subtotal < 0) subtotal = 0;
        this._subtotal = subtotal;
        return subtotal;
    }

    public set posicion(posicion: number) {
        this._posicion = posicion;
    }

    public set subtotal(value: number) {
        this._subtotal = value;
    }

    public set cantidad(value: number) {
        this._cantidad = value;
    }

    public set producto(value: Producto) {
        this._producto = value;
    }

    public set dcto(value: number) {
        this._dcto = value;
    }

    public set insert(value: boolean) {
        this._insert = value;
    }

    public set servicio(value: Servicio) {
        this._servicio = value;
    }

    public set tipo(value: string) {
        this._tipo = value;
    }

    public get posicion(): number {
        return this._posicion;
    }

    public get subtotal(): number {
        return this._subtotal;
    }

    public get cantidad(): number {
        return this._cantidad;
    }

    public get producto(): Producto {
        return this._producto;
    }

    public get dcto(): number {
        return this._dcto;
    }

    public get insert(): boolean {
        return this._insert;
    }

    public get servicio(): Servicio {
        return this._servicio;
    }

    public get tipo(): string {
        return this._tipo;
    }

}
