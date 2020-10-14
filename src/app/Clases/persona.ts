export class Persona {

    constructor(private _rut: string,
        private _nombre: string,
        private _giro?: string,
        private _tipo?: string,
        private _ciudad?: string,
        private _comuna?: string,
        private _direccion?: string,
        private _contacto?: string,
        private _email?: string) {
    }

    public get tipo(): string {
        return this._tipo;
    }
    public set tipo(value: string) {
        this._tipo = value;
    }
    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }
    public get contacto(): string {
        return this._contacto;
    }
    public set contacto(value: string) {
        this._contacto = value;
    }
    public get direccion(): string {
        return this._direccion;
    }
    public set direccion(value: string) {
        this._direccion = value;
    }
    public get comuna(): string {
        return this._comuna;
    }
    public set comuna(value: string) {
        this._comuna = value;
    }
    public get ciudad(): string {
        return this._ciudad;
    }
    public set ciudad(value: string) {
        this._ciudad = value;
    }
    public get giro(): string {
        return this._giro;
    }
    public set giro(value: string) {
        this._giro = value;
    }
    public get nombre(): string {
        return this._nombre;
    }
    public set nombre(value: string) {
        this._nombre = value;
    }
    public get rut(): string {
        return this._rut;
    }
    public set rut(value: string) {
        this._rut = value;
    }

}
