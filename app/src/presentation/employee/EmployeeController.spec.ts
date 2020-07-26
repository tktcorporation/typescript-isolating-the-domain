import 'reflect-metadata';
import { EmployeeController } from './EmployeeController';
import { container } from 'tsyringe';
import { EmployeeRegisterBody } from './request/EmployeeRegisterBody';
import { DBConnection } from 'src/component/database/dbconnection/dbconnection';
import { EmployeeDao } from 'src/infrastructure/datasource/emploee/EmployeeDao';
import { EmployeeDataSource } from 'src/infrastructure/datasource/emploee/EmployeeDataSource';

container.register('ConnectionManager', { useClass: DBConnection });
container.register('EmployeeMapper', { useClass: EmployeeDao });
container.register('EmployeeRepository', { useClass: EmployeeDataSource });

describe('EmployeeController', () => {
    let controller: EmployeeController;
    beforeAll(() => {
        controller = container.resolve(EmployeeController);
    });
    it('defined', () => {
        expect(controller).toBeDefined();
    });
    it('register', async () => {
        const body = new EmployeeRegisterBody(
            'John Doe',
            'tktcorporation.go@gmail.com',
            '000-0000-0000',
        );
        const resposne = await controller.register(body);
        expect(resposne.employee_number).toBeDefined();
        expect(resposne.employee_number).toBeGreaterThan(0);
    });
    afterAll(async () => {
        await DBConnection.release();
        await DBConnection.close();
    });
});
