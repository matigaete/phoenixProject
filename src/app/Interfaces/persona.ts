import { TipoPersona } from '../Utils/persona.constants';

export interface Persona {
    rut?: string,
    nombre?: string,
    tipo?: TipoPersona,
    giro?: string,
    region?: string,
    provincia?: string,
    comuna?: string,
    direccion?: string,
    contacto?: string,
    email?: string
}
