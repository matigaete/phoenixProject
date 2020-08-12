export class Producto {
	
	private id : number;
	private nombre : string;
	private categoria : string;
	
	constructor(){
	}

	public setID(id : number) : void{
		this.id = id;
	}

	public setNombre(nombre : string) : void{
		this.nombre = nombre;
	}

	public setCategoria(categoria : string) : void{
		this.categoria = categoria;
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
}
