export class Region {
    
    constructor(private _id?: number,
        private _region?: string,
        private _abreviatura?: string,
        private _capital?: string){
    }

    public get capital(): string {
        return this._capital;
    }
    public set capital(value: string) {
        this._capital = value;
    }
    public get abreviatura(): string {
        return this._abreviatura;
    }
    public set abreviatura(value: string) {
        this._abreviatura = value;
    }
    public get region(): string {
        return this._region;
    }
    public set region(value: string) {
        this._region = value;
    }
    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
}
