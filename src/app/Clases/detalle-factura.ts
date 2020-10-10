export class DetalleFactura {

    constructor(private _codFactura: string,
        private _posicion: number,
        private _cantidad: number,
        private _precioCompra: number,
        private _subtotal: number,
        private _codProducto: string,
        private _codPersona: string) {
        this._posicion = _posicion;
        this._codFactura = _codFactura;
        this._cantidad = _cantidad;
        this._precioCompra = _precioCompra;
        this._subtotal = _subtotal;
        this._codProducto = _codProducto;
        this._codPersona = _codPersona;
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

    public set codProducto(value: string) {
        this._codProducto = value;
    }

    public set subtotal(value: number) {
        this._subtotal = value;
    }

    public set precioCompra(value: number) {
        this._precioCompra = value;
    }

    public set cantidad(value: number) {
        this._cantidad = value;
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

    public get codProducto(): string {
        return this._codProducto;
    }

    public get subtotal(): number {
        return this._subtotal;
    }

    public get precioCompra(): number {
        return this._precioCompra;
    }

    public get cantidad(): number {
        return this._cantidad;
    }

}
