export class Comuna {

    constructor(private _id: number,
        private _comuna: string){
    }
    public get comuna(): string {
        return this._comuna;
    }
    public set comuna(value: string) {
        this._comuna = value;
    }
    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
}
