import { consulta } from "./db";
import {
    CreateIntreface,
    DeleteByParameterInterface,
    DeleteInterface,
    GetByParameterInterface,
    GetInterface,
    UpdateInterface,
} from "./types";

class CrudService {
    public getAll<T>({ table }: GetInterface): Promise<T[]> {
        const sql = `SELECT * FROM ${table}`;

        try {
            return consulta<T>({
                sql,
                mensagemReject: "Erro ao buscar dados",
            });
        } catch (err: any) {
            return err;
        }
    }

    public createRecord<T>({ table, fields }: CreateIntreface): Promise<T[]> {
        try {
            if (!fields) return Promise.reject("Nenhum dado fornecido");

            const fieldNames = Object.keys(fields).join(", ");
            const fieldValues = Object.values(fields);
            const placeholders = fieldValues.map((_, index) => `$${index + 1}`).join(", ");
            const sql = `INSERT INTO ${table} (${fieldNames}) VALUES (${placeholders}) RETURNING *`;

            return consulta<T>({
                sql,
                valores: fieldValues,
                mensagemReject: "Erro ao inserir dados",
            });
        } catch (error) {
            throw error;
        }
    }

    public async updateRecord({ table, fields, idTable, column }: UpdateInterface) {
        if (!fields || Object.keys(fields).length === 0) {
            return Promise.reject("Nenhum dado fornecido");
        }

        const fieldEntries = Object.entries(fields);

        const updates = fieldEntries
            .map(([key], index) => `${key} = $${index + 1}`)
            .join(", ");

        const wherePlaceholder = `$${fieldEntries.length + 1}`;
        const sql = `UPDATE ${table} SET ${updates} WHERE ${column} = ${wherePlaceholder} RETURNING *`;
        const values = [...fieldEntries.map(([_, value]) => value), idTable];

        try {
            const response = await consulta({
                sql,
                valores: values,
                mensagemReject: "Erro ao atualizar dados",
            });

            if (!response) {
                throw new Error("Erro ao atualizar registro");
            }

            return response;
        } catch (err: any) {
            return err;
        }
    }

    public deleteById({ table, idTable }: DeleteInterface) {
        const sql = `DELETE FROM ${table} WHERE id = ${idTable}`;

        try {
            const response = consulta({
                sql,
                mensagemReject: "Erro ao deletar dados",
            });

            if (!response) {
                return Promise.reject(new Error("Erro ao deletar registro"));
            }

            return response;
        } catch (err: any) {
            return err;
        }
    }

    public deleteByField({ table, idTable, column }: DeleteByParameterInterface) {
        const sql = `DELETE FROM ${table} WHERE ${column} = ${idTable}`;

        try {
            const response = consulta({
                sql,
                mensagemReject: "Erro ao deletar dados",
            });

            if (!response) {
                return Promise.reject(new Error("Erro ao deletar registro"));
            }

            return response;
        } catch (err: any) {
            return err;
        }
    }

    public async getByField<T>({
        table,
        column,
        idTable,
    }: GetByParameterInterface): Promise<T> {
        if (!idTable) {
            return Promise.reject(new Error("Nenhum identificador fornecido"));
        }

        const sql = `SELECT * FROM ${table} WHERE ${column} = '${idTable}'`;

        try {
            const response = await consulta<T[]>({
                sql,
                mensagemReject: "Erro ao buscar o registro",
            });

            return response as T;
        } catch (err: any) {
            throw new Error(err.message || "Erro ao buscar registro");
        }
    }
}

export default new CrudService();
