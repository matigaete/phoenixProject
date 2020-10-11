import { Producto } from './producto';

export class DetalleFactura {
    
    constructor(private _posicion: number,
        private _cantidad: number, 
        private _subtotal: number,
        private _insert?: boolean,
        private _codFactura?: string,
        private _codPersona?: string,
        private _dcto?: number,
        private _producto?: Producto) {
        this._posicion = _posicion;
        this._codFactura = _codFactura;
        this._cantidad = _cantidad; 
        this._subtotal = _subtotal;
        this._codPersona = _codPersona;
        this._producto = _producto;
        this._insert = _insert;
        this._dcto = _dcto;
    }

    public getSubtotal(dcto: number): number {
        try {
            var subtotal = (this.cantidad * this.producto.precioVenta) - dcto;   
        } catch(error) {
            subtotal = 0
        }
        if (subtotal < 0) subtotal = 0;
        this._subtotal = subtotal;
        return subtotal;
    }

    public set posicion(posicion: number) {
        this._posicion = posicion;
    }

    public set codFactura(codFactura: string) {
        this._codFactura = codFactura;
    }

    public set codPersona(value: string) {
        this._codPersona = value;
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

    public get posicion(): number {
        return this._posicion;
    }

    public get codFactura(): string {
        return this._codFactura;
    }

    public get codPersona(): string {
        return this._codPersona;
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

}
