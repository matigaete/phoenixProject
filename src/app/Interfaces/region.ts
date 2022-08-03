import { Provincia } from './provincia';

export interface Region {
    id?: number,
    nombre?: string,
    abreviatura?: string,
    capital?: string,
    provincias: Provincia[]
}
