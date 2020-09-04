export class Categoria {

    constructor( private _tipo : string, 
        private _codigo ?: number){
	this._codigo = _codigo;
	this._tipo = _tipo;
	}

	public set codigo(codigo : number ) {
		this._codigo = codigo;
	}

	public set tipo(tipo : string) {
		this._tipo = tipo;
	}

	public get codigo() : number {
		return this._codigo;		
	}

	public get tipo() : string {
		return this._tipo;		
	}
}
