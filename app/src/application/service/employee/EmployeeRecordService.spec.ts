import 'reflect-metadata';
import { DBConnection } from 'src/component/database/dbconnection/dbconnection';
import { EmployeeRecordService } from './EmployeeRecordService';
import { container } from 'tsyringe';
import { EmployeeDao } from 'src/infrastructure/datasource/emploee/EmployeeDao';
import { EmployeeDataSource } from 'src/infrastructure/datasource/emploee/EmployeeDataSource';

container.register('ConnectionManager', { useClass: DBConnection });
container.register('EmployeeMapper', { useClass: EmployeeDao });
container.register('EmployeeRepository', { useClass: EmployeeDataSource });

describe('EmployeeRepository', () => {
    let service: EmployeeRecordService;
    beforeAll(async () => {
        service = container.resolve(EmployeeRecordService);
    });

    it('prepareNewContract', async () => {
        const employeeNumber = await service.prepareNewContract();
        expect(employeeNumber.value()).toBeDefined();
        expect(typeof employeeNumber.value()).toBe('number');
    });

    afterAll(async () => {
        await DBConnection.release();
        await DBConnection.close();
    });
});
