export interface Transaction {
    idpos: number;
    insert: boolean;
    idItem: string;
    name?: string;
    cant?: number;
    disp?: number;
    cost: number;
}