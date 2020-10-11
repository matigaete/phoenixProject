export class Servicio {

	constructor(private _nombre: string,
		private _descripcion: string,
		private _precioVenta: number,
		private _codigo?: number | string) {
		this._codigo = _codigo;
		this._nombre = _nombre;
		this._descripcion = _descripcion;
		this._precioVenta = _precioVenta; 
	}

	public set codigo(codigo: number | string) {
		this._codigo = codigo;
	}

	public set nombre(nombre: string) {
		this._nombre = nombre;
	}

	public set descripcion(descripcion: string) {
		this._descripcion = descripcion;
	}
 
	public set precioVenta(precioVenta: number) {
		this._precioVenta = precioVenta;
	}

	public get codigo(): number | string {
		return this._codigo;
	}

	public get nombre(): string {
		return this._nombre;
	}

	public get descripcion(): string {
		return this._descripcion;
	}

	public get precioVenta(): number {
		return this._precioVenta;
	}

}
