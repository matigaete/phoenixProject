export class Producto {

	constructor( private nombre : string, 
		private tipo : string, private descripcion : string, 
		private stock : number, private stockCritico : number,
		private precioCompra : number, private precioVenta : number,
		private activo : boolean, private codigo ?: number ){
	this.codigo = codigo;
	this.nombre = nombre;
	this.descripcion = descripcion;
	this.tipo = tipo;
	this.stock = stock;
	this.stockCritico = stockCritico;
	this.precioCompra = precioCompra;
	this.precioVenta = precioVenta;
	this.activo = activo;
	}

	public setCodigo(codigo : number) : void{
		this.codigo = codigo;
	}

	public setNombre(nombre : string) : void{
		this.nombre = nombre;
	}

	public setDescripcion(descripcion: string) : void{
		this.descripcion = descripcion;
	}

	public setTipo(tipo : string) : void{
		this.tipo = tipo;
	}

	public setStock(stock : number) : void{
		this.stock= stock;
	}

	public setStockCritico(stockCritico : number) : void{
		this.stockCritico = stockCritico;
	}

	public setPrecioCompra(precioCompra : number) : void{
		this.precioCompra = precioCompra;
	}

	public setPrecioVenta(precioVenta : number) : void{
		this.precioVenta = precioVenta;
	}

	public setActivo(activo : boolean) : void{
		this.activo = activo;
	}

	public getCodigo() : number {
		return this.codigo;		
	}

	public getNombre() : string {
		return this.nombre;		
	}

	public getTipo() : string {
		return this.tipo;	
	}

	public getDescripcion() : string{
		return this.descripcion;
	}

	public getStock() : number{
		return this.stock;
	}

	public getStockCritico() : number{
		return this.stockCritico;
	}

	public getPrecioCompra() : number{
		return this.precioCompra;
	}

	public getPrecioVenta() : number{
		return this.precioVenta;
	}

	public getActivo() : boolean{
		return this.activo;
	}

}
