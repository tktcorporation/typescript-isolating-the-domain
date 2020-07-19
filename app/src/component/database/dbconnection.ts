import {
    Connection,
    createConnection,
    EntityManager,
    getConnection,
    ConnectionOptions,
} from 'typeorm';

export class DBConnection {
    static getManager = (): Promise<EntityManager> =>
        DBConnection.get().then((con) => con.manager);
    static get = async (): Promise<Connection> => {
        if (DBConnection.con && DBConnection.con.isConnected)
            return DBConnection.con;
        if (DBConnection.con instanceof Connection)
            return DBConnection.con.connect();
        return DBConnection.create();
    };
    static close = async (): Promise<void> => {
        if (!DBConnection.con) return;
        if (DBConnection.con && DBConnection.con.isConnected)
            DBConnection.con.close();
        DBConnection.con = undefined;
    };
    static setSearchPath = () => {
        if (DBConnection.con)
            return DBConnection.con.query(DBConnection.getSearchPathQuery());
    };
    static useTransaction = async <T>(
        func: (manager: EntityManager) => Promise<T>,
    ): Promise<T> =>
        (await DBConnection.create()).transaction((manager) => func(manager));

    private static con?: Connection;
    private static create = async (): Promise<Connection> => {
        DBConnection.con = await createConnection(
            DBConnection.options,
        ).catch(() => getConnection());
        if (!DBConnection.con.isConnected) await DBConnection.con.connect();
        // await DBConnection.setSearchPath();
        return DBConnection.con;
    };
    private static getSearchPathQuery = () =>
        `SET search_path TO '${process.env.SCHEMA_NAME}';`;
}
export namespace DBConnection {
    export const options: ConnectionOptions = {
        type: 'postgres',
        host: process.env.DB_HOST,
        port: Number.parseInt(process.env.DB_PORT || '5432'),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE_NAME,
        synchronize: false,
        logging: ['error'], //process.env.NODE_ENV === 'production' ? ['error'] : 'all',
    };
}
