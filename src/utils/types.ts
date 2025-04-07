export interface TypesCrud {
    table: string;
    idTable?: string | number;
    fields?: { [key: string]: any };
    column?: string;
}

export interface GetInterface {
    table: string;
}

export interface CreateIntreface {
    table: string;
    fields: { [key: string]: any };
}
export interface UpdateInterface {
    table: string;
    idTable: string | number;
    fields: { [key: string]: any };
    column: string;
}

export interface DeleteInterface {
    table: string;
    idTable: string | number;
}

export interface DeleteByParameterInterface {
    table: string;
    idTable: string | number;
    column: string;
}

export interface GetByParameterInterface {
    table: string;
    idTable: string | number | null;
    column: string;
    id_patient?: string;
}
