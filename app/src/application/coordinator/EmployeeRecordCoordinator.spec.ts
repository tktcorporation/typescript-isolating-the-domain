import 'reflect-metadata';
import { DBConnection } from 'src/component/database/dbconnection/dbconnection';
import { EmployeeDao } from 'src/infrastructure/datasource/emploee/EmployeeDao';
import { EmployeeRecordCoordinator } from '../coordinator/EmployeeRecordCoordinator';
import { EmployeeToRegister } from 'src/domain/model/employee/EmployeeToRegister';
import { MailAddress } from 'src/domain/model/employee/MailAddress';
import { PhoneNumber } from 'src/domain/model/employee/PhoneNumber';
import { Name } from 'src/domain/model/employee/Name';
import { EmployeeDataSource } from 'src/infrastructure/datasource/emploee/EmployeeDataSource';
import { EmployeeNumber } from 'src/domain/model/employee/EmployeeNumber';
import { TestingModule, Test } from '@nestjs/testing';
import { EmployeeRepository } from '../repository/EmployeeRepository';
import { EmployeeRecordService } from '../service/employee/EmployeeRecordService';

describe('EmployeeRecordCoordinator', () => {
    let module: TestingModule;
    let coordinator: EmployeeRecordCoordinator;
    let employeeNumber: EmployeeNumber;

    const name = 'name';
    const mailAddress = 'xxxxxxxxx@gmail.com';
    const phoneNumber = '000-0000-0000';

    beforeAll(async () => {
        module = await Test.createTestingModule({
            providers: [
                { provide: 'ConnectionManager', useClass: DBConnection },
                { provide: 'EmployeeMapper', useClass: EmployeeDao },
                { provide: 'EmployeeRepository', useClass: EmployeeDataSource },
                EmployeeRecordService,
                EmployeeRecordCoordinator,
            ],
        }).compile();
        coordinator = module.get(EmployeeRecordCoordinator);
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
        const employee = await module
            .get<EmployeeRepository>('EmployeeRepository')
            .choose(employeeNumber);
        expect(employee).toBeDefined();
        expect(employee?.employeeNumber()?.value()).toBe(
            employeeNumber.value(),
        );
        expect(employee?.mailAddress()?.toString()).toBe(mailAddress);
        expect(employee?.name()?.toString()).toBe(name);
        expect(employee?.phoneNumber()?.toString()).toBe(phoneNumber);
    });
    afterAll(async () => {
        await DBConnection.release();
        await DBConnection.close();
    });
});
