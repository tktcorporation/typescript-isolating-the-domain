import 'reflect-metadata';
import { DBConnection } from 'src/component/database/dbconnection/dbconnection';
import { EmployeeDao } from './EmployeeDao';
import { EmployeeDataSource } from './EmployeeDataSource';
import { container } from 'tsyringe';
import { EmployeeNumber } from 'src/domain/model/employee/EmployeeNumber';

container.register('ConnectionManager', { useClass: DBConnection });
container.register('EmployeeMapper', { useClass: EmployeeDao });
container.register('EmployeeRepository', { useClass: EmployeeDataSource });

describe('EmployeeDataSource', () => {
    let datasource: EmployeeDataSource;
    beforeAll(async () => {
        await DBConnection.startTransaction();
        datasource = container.resolve(EmployeeDataSource);
    });
    it('choose', async () => {
        const number = new EmployeeNumber();
        const employee = await datasource.choose(number);
        expect(employee).toBeUndefined();
    });
    afterAll(async () => {
        await DBConnection.rollbackTransaction();
        await DBConnection.release();
        await DBConnection.close();
    });
});
