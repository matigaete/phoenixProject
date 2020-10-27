import { DetalleFactura } from './detalle-factura';
import { Persona } from './persona';

export class Factura {

    constructor(private _codFactura: number,
        private _persona: Persona,
        private _fecha: string,
        private _hora: string,
        private _neto: number,
        private _iva: number,
        private _total: number,
        private _tipo: string,
        private _detalle?: DetalleFactura[]) {
        this._codFactura = _codFactura;
        this._fecha = _fecha;
        this._hora = _hora;
        this._total = _total;
        this._tipo = _tipo;
        this._detalle = [];
    }

    public generaFactura(): boolean {
        let compra: boolean;
        this.detalle.forEach(det => {
            if (det.tipo == 'P') {
                det.servicio = undefined;
            } else {
                det.producto = undefined;
            }
        });
        if (this.tipo == 'C') {
            compra = true;
        } else {
            compra = false;
        }
        return compra;
    }

    public getNetAmount(): number {
        try {
            if (this._tipo == 'C') {
                this._neto = this.detalle.map(t => (t.producto.precioCompra * t.cantidad) - ((t.producto.precioCompra * t.cantidad) * (t.dcto/100)))
                    .reduce((acc, value) => acc + value, 0);
            } else {
                this._neto = this.detalle.map((t) => {
                    var value = 0;
                    if (t.tipo == 'P') {
                        value = (t.producto.precioVenta * t.cantidad) - ((t.producto.precioVenta * t.cantidad) * (t.dcto/100));
                    } else {
                        value = t.servicio.precioVenta - t.dcto;
                    }
                    return value;
                }).reduce((acc, value) => acc + value, 0);
            }
        } catch (error) {
            this._neto = 0;
        }
        if (this._neto < 0) this._neto = 0;
        return this._neto;
    }

    public getIVA(): number {
        this._iva = this.getNetAmount() * 0.19;
        return this._iva;
    }

    public getTotalCost(): number {
        this._total = this.getNetAmount() + this.getIVA();
        return this._total;
    }

    public set codFactura(codFactura: number) {
        this._codFactura = codFactura;
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

    public set detalle(value: DetalleFactura[]) {
        this._detalle = value;
    }

    public set persona(value: Persona) {
        this._persona = value;
    }

    public get persona(): Persona {
        return this._persona;
    }

    public get hora(): string {
        return this._hora;
    }

    public get total(): number {
        return this._total;
    }

    public get codFactura(): number {
        return this._codFactura;
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

    public get detalle(): DetalleFactura[] {
        return this._detalle;
    }

}
