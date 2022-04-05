import { Comuna } from './comuna';

export interface Provincia {
    id?: number,
    nombre?: string,
    comunas: Comuna[]
}
