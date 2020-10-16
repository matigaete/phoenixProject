export class Precio {
    
    constructor(private _fecha: string,
		private _hora: string, 
		private _precio: number,  
		private _codigo?: number | string) {
		this._codigo = _codigo;
		this._fecha = _fecha; 
		this._hora = _hora; 
		this._precio = _precio; 
    }
    
    public get precio(): number {
        return this._precio;
    }
    public set precio(value: number) {
        this._precio = value;
    }
    public get fecha(): string {
        return this._fecha;
    }
    public set fecha(value: string) {
        this._fecha = value;
    }
    public get hora(): string {
        return this._hora;
    }
    public set hora(value: string) {
        this._hora = value;
    }
    public get codigo(): number | string {
        return this._codigo;
    }
    public set codigo(value: number | string) {
        this._codigo = value;
    }
}
