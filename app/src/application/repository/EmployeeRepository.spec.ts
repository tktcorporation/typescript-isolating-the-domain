import 'reflect-metadata';
import { DBConnection } from 'src/component/database/dbconnection';
import { EmployeeDao } from 'src/infrastructure/datasource/emploee/EmployeeDao';
import { QueryRunner } from 'typeorm';
import { container } from 'tsyringe';
import { EmployeeRecordCoordinator } from '../coordinator/EmployeeRecordCoordinator';
import { EmployeeToRegister } from 'src/domain/model/employee/EmployeeToRegister';
import { MailAddress } from 'src/domain/model/employee/MailAddress';
import { PhoneNumber } from 'src/domain/model/employee/PhoneNumber';
import { Name } from 'src/domain/model/employee/Name';
import { EmployeeDataSource } from 'src/infrastructure/datasource/emploee/EmployeeDataSource';

container.register('ConnectionManager', { useClass: DBConnection });
container.register('EmployeeMapper', { useClass: EmployeeDao });
container.register('EmployeeRepository', { useClass: EmployeeDataSource });

describe('EmployeeRepository', () => {
    let queryRunner: QueryRunner;
    let coordinator: EmployeeRecordCoordinator;

    beforeAll(async () => {
        queryRunner = await DBConnection.getQueryRunner();
        coordinator = container.resolve(EmployeeRecordCoordinator);
    });

    it('should be defined', () => {
        expect(coordinator).toBeDefined();
    });
    it('register new', async () => {
        const toRegister = new EmployeeToRegister(
            new Name('name'),
            new MailAddress('xxxxxxxxx@gmail.com'),
            new PhoneNumber('000-0000-0000'),
        );
        const employee = await coordinator.register(toRegister);
        console.log(employee);
    });
    afterAll(async () => {
        await queryRunner.rollbackTransaction();
        await queryRunner.release();
        await DBConnection.close();
    });
});
