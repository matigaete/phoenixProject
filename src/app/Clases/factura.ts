export class Factura {
    
    constructor(private _codigoFactura: string,
        private _codProveedor: string,
        private _fecha: string,
        private _hora: string,
        private _total: number,
        private _tipo: string) {
        this._codigoFactura = _codigoFactura;
        this._codProveedor = _codProveedor;
        this._fecha = _fecha;
        this._hora = _hora;
        this._total = _total;
        this._tipo = _tipo;
    }

    public set codigoFactura(codigoFactura: string) {
        this._codigoFactura = codigoFactura;
    }

    public set codProveedor(value: string) {
        this._codProveedor = value;
    }

    public set fecha(value: string) {
        this._fecha = value;
    }

    public set total(value: number) {
        this._total = value;
    }

    public set hora(value: string) {
        this._hora = value;
    }

    public set tipo(value: string) {
        this._tipo = value;
    }

    public get hora(): string {
        return this._hora;
    }

    public get total(): number {
        return this._total;
    }

    public get codigoFactura(): string {
        return this._codigoFactura;
    }

    public get codProveedor(): string {
        return this._codProveedor;
    }

    public get fecha(): string {
        return this._fecha;
    }
    
    public get tipo(): string {
        return this._tipo;
    }

}
