import {
    Connection,
    createConnection,
    EntityManager,
    getConnection,
    ConnectionOptions,
    QueryRunner,
} from 'typeorm';
import { singleton } from 'tsyringe';

@singleton()
export class DBConnection {
    manager = () => DBConnection.getManager();
    connection = () => DBConnection.get();

    static startTransaction = async (): Promise<void> => {
        if (DBConnection._queryRunner)
            return DBConnection._queryRunner.startTransaction();
        return (await DBConnection.getQueryRunner()).startTransaction();
    };
    static getQueryRunner = async (): Promise<QueryRunner> => {
        if (DBConnection._queryRunner) return DBConnection._queryRunner;
        return DBConnection.createQueryRunner();
    };

    static getManager = async (): Promise<EntityManager> => {
        if (DBConnection._manager) return DBConnection._manager;
        return DBConnection.createManager();
    };

    static get = async (): Promise<Connection> => {
        if (DBConnection._connection && DBConnection._connection.isConnected)
            return DBConnection._connection;
        if (DBConnection._connection instanceof Connection)
            return DBConnection._connection.connect();
        return DBConnection.create();
    };
    static close = async (): Promise<void> => {
        if (!DBConnection._connection) return;
        if (DBConnection._connection && DBConnection._connection.isConnected)
            DBConnection._connection.close();
        DBConnection._connection = undefined;
        DBConnection._manager = undefined;
    };
    static setSearchPath = () => {
        if (DBConnection._connection)
            return DBConnection._connection.query(
                DBConnection.getSearchPathQuery(),
            );
    };
    static useTransaction = async <T>(
        func: (manager: EntityManager) => Promise<T>,
    ): Promise<T> =>
        (await DBConnection.create()).transaction((manager) => func(manager));

    private static _connection?: Connection;
    private static _manager?: EntityManager;
    private static _queryRunner?: QueryRunner;

    private static create = async (): Promise<Connection> => {
        DBConnection._connection = await createConnection(
            DBConnection.options,
        ).catch(() => getConnection());
        if (!DBConnection._connection.isConnected)
            await DBConnection._connection.connect();
        // await DBConnection.setSearchPath();
        return DBConnection._connection;
    };
    private static createQueryRunner = async (): Promise<QueryRunner> => {
        DBConnection._queryRunner = (
            await DBConnection.get()
        ).createQueryRunner();
        return DBConnection._queryRunner;
    };
    private static createManager = async (): Promise<EntityManager> => {
        DBConnection._manager = (await DBConnection.getQueryRunner()).manager;
        return DBConnection._manager;
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
