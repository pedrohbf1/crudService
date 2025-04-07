import { Client, Pool } from "pg";
import pg from "pg";

interface ConsultaQuery {
    sql: string;
    valores?: any[] | string | unknown;
    mensagemReject?: string;
}

const db = new Client({
    user: 'pedrohbfreitas',
    host: 'devPedro',
    database: 'pedro_pg',
    password: 'devPedro-senha',
    port: 5432,
    ssl: {
        rejectUnauthorized: true,
    },
});

export const consulta = <T>({
    sql,
    valores = [],
    mensagemReject,
}: ConsultaQuery): Promise<T[]> => {
    return new Promise((resolve, reject) => {
        db.query(
            sql,
            Array.isArray(valores) ? valores : [],
            (erro: Error | null, resultado: pg.QueryResult<any> | null) => {
                if (erro) return reject(mensagemReject);
                const row = resultado?.rows as T[];
                return resolve(row);
            }
        );
    });
};

export default db;
