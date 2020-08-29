import 'reflect-metadata';
import { DBConnection } from 'src/component/database/dbconnection/dbconnection';
import { EmployeeDao } from './EmployeeDao';
import { EmployeeDataSource } from './EmployeeDataSource';
import { EmployeeNumber } from 'src/domain/model/employee/EmployeeNumber';
import { Test, TestingModule } from '@nestjs/testing';
import { Logger } from '@nestjs/common';

describe('EmployeeDataSource', () => {
    let datasource: EmployeeDataSource;
    beforeAll(async () => {
        await DBConnection.startTransaction();
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                { provide: 'ConnectionManager', useClass: DBConnection },
                { provide: 'EmployeeMapper', useClass: EmployeeDao },
                { provide: 'EmployeeRepository', useClass: EmployeeDataSource },
            ],
        }).compile();
        datasource = module.get<EmployeeDataSource>('EmployeeRepository');
    });
    it('defined', () => {
        expect(datasource).toBeDefined();
        Logger.debug(datasource);
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
