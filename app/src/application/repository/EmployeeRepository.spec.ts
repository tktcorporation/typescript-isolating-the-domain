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
import { EmployeeNumber } from 'src/domain/model/employee/EmployeeNumber';

container.register('ConnectionManager', { useClass: DBConnection });
container.register('EmployeeMapper', { useClass: EmployeeDao });
container.register('EmployeeRepository', { useClass: EmployeeDataSource });

describe('EmployeeRepository', () => {
    let queryRunner: QueryRunner;
    let coordinator: EmployeeRecordCoordinator;

    let employeeNumber: EmployeeNumber;

    const name = 'name';
    const mailAddress = 'xxxxxxxxx@gmail.com';
    const phoneNumber = '000-0000-0000';

    beforeAll(async () => {
        queryRunner = await DBConnection.getQueryRunner();
        coordinator = container.resolve(EmployeeRecordCoordinator);
    });

    it('should be defined', () => {
        expect(coordinator).toBeDefined();
    });
    it('register new', async () => {
        const toRegister = new EmployeeToRegister(
            new Name(name),
            new MailAddress(mailAddress),
            new PhoneNumber(phoneNumber),
        );
        employeeNumber = await coordinator.register(toRegister);
        expect(employeeNumber).toBeDefined();
        expect(employeeNumber.value()).toBeDefined();
        expect(typeof employeeNumber.value()).toBe('number');
    });
    it('choose', async () => {
        const employee = await container
            .resolve(EmployeeDataSource)
            .choose(employeeNumber);
        console.log(employee);
        expect(employee).toBeDefined();
        expect(employee?.employeeNumber()?.value()).toBe(
            employeeNumber.value(),
        );
        expect(employee?.mailAddress()?.toString()).toBe(mailAddress);
        expect(employee?.name()?.toString()).toBe(name);
        expect(employee?.phoneNumber()?.toString()).toBe(phoneNumber);
    });
    afterAll(async () => {
        await queryRunner.rollbackTransaction();
        await queryRunner.release();
        await DBConnection.close();
    });
});
