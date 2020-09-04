export class Producto {

	constructor( private _nombre : string, 
		private _tipo : number | string, private _descripcion : string, 
		private _stock : number, private _stockCritico : number,
		private _precioCompra : number, private _precioVenta : number,
		private _activo : boolean, private _codigo ?: number | string ){
	this._codigo = _codigo;
	this._nombre = _nombre;
	this._descripcion = _descripcion;
	this._tipo = _tipo;
	this._stock = _stock;
	this._stockCritico = _stockCritico;
	this._precioCompra = _precioCompra;
	this._precioVenta = _precioVenta;
	this._activo = _activo;
	}

	public set codigo(codigo : number | string) {
		this._codigo = codigo;
	}

	public set nombre(nombre : string) {
		this._nombre = nombre;
	}

	public set descripcion(descripcion: string){
		this._descripcion = descripcion;
	}

	public set tipo(tipo : number | string) {
		this._tipo = tipo;
	}

	public set stock(stock : number) {
		this._stock= stock;
	}

	public set stockCritico(stockCritico : number) {
		this._stockCritico = stockCritico;
	}

	public set precioCompra(precioCompra : number) {
		this._precioCompra = precioCompra;
	}

	public set precioVenta(precioVenta : number) {
		this._precioVenta = precioVenta;
	}

	public set activo(activo : boolean) {
		this._activo = activo;
	}

	public get codigo() : number | string {
		return this._codigo;		
	}

	public get nombre() : string {
		return this._nombre;		
	}

	public get tipo() : number | string {
		return this._tipo;	
	}

	public get descripcion() : string{
		return this._descripcion;
	}

	public get stock() : number{
		return this._stock;
	}

	public get stockCritico() : number{
		return this._stockCritico;
	}

	public get precioCompra() : number{
		return this._precioCompra;
	}

	public get precioVenta() : number{
		return this._precioVenta;
	}

	public get activo() : boolean{
		return this._activo;
	}

}
