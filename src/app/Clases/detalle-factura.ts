export class DetalleFactura {

    constructor(private _codigoFactura: string,
        private _posicion: number,
        private _cantidad: number,
        private _precioCompra: number,
        private _subtotal: number,
        private _codProducto: string,
        private _codProveedor: string) {
        this._posicion = _posicion;
        this._codigoFactura = _codigoFactura;
        this._cantidad = _cantidad;
        this._precioCompra = _precioCompra;
        this._subtotal = _subtotal;
        this._codProducto = _codProducto;
        this._codProveedor = _codProveedor;
    }

    public set posicion(posicion: number) {
        this._posicion = posicion;
    }

    public set codigoFactura(codigoFactura: string) {
        this._codigoFactura = codigoFactura;
    }

    public set codProveedor(value: string) {
        this._codProveedor = value;
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

    public get codigoFactura(): string {
        return this._codigoFactura;
    }

    public get codProveedor(): string {
        return this._codProveedor;
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
