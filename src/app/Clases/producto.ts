export class Producto {
	
	private id : number;
	public nombre : string;
	private categoria : string;
	private descripcion : string;
    private stock : number;
    private stockCritico : number;
    private precioCompra : number;
    private precioVenta : number;

	constructor(id : number, nombre : string, categoria : string,
		  		descripcion : string, stock : number, stockCritico : number,
				precioCompra : number, precioVenta : number){
		this.id = id;
		this.nombre = nombre;
		this.descripcion = descripcion;
		this.categoria = categoria;
		this.stock = stock;
		this.stockCritico = stockCritico;
		this.precioCompra = precioCompra;
		this.precioVenta = precioVenta;
	}

	public setID(id : number) : void{
		this.id = id;
	}

	public setNombre(nombre : string) : void{
		this.nombre = nombre;
	}

	public setDescripcion(descripcion: string) : void{
		this.descripcion = descripcion;
	}

	public setCategoria(categoria : string) : void{
		this.categoria = categoria;
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

	public getID() : number {
		return this.id;		
	}

	public getNombre() : string {
		return this.nombre;		
	}

	public getCategoria() : string {
		return this.categoria;	
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

	public toString() : string {
		return 'CAMARA INCREIBLE, PANTALLA INCREIBLE';
	}
}
