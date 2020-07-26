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
        const employeeNumber = await datasource.registerNew();
        expect(employeeNumber).toBeDefined();
        expect(employeeNumber.value()).toBeGreaterThan(0);
    });
    it('choose doesnt have join data', async () => {
        const employeeNumber = await datasource.registerNew();
        const employee = await datasource.choose(employeeNumber);
        expect(employee).toBeUndefined();
    });
    afterAll(async () => {
        await DBConnection.rollbackTransaction();
        await DBConnection.release();
        await DBConnection.close();
    });
});
