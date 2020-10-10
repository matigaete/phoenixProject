export class Factura {
    
    constructor(private _codFactura: string,
        private _codPersona: string,
        private _fecha: string,
        private _hora: string,
        private _neto: number,
        private _iva: number,
        private _total: number,
        private _tipo: string) {
        this._codFactura = _codFactura;
        this._codPersona = _codPersona;
        this._fecha = _fecha;
        this._hora = _hora;
        this._total = _total;
        this._tipo = _tipo;
    }

    public set codFactura(codFactura: string) {
        this._codFactura = codFactura;
    } 

    public set codPersona(value: string) {
        this._codPersona = value;
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

    public set neto(value: number) {
        this._neto = value;
    }

    public set iva(value: number) {
        this._iva = value;
    }

    public get hora(): string {
        return this._hora;
    }

    public get total(): number {
        return this._total;
    }

    public get codFactura(): string {
        return this._codFactura;
    }

    public get codPersona(): string {
        return this._codPersona;
    }

    public get fecha(): string {
        return this._fecha;
    }
    
    public get tipo(): string {
        return this._tipo;
    }

    public get neto(): number {
        return this._neto;
    }

    public get iva(): number {
        return this._iva;
    }

}
