import 'reflect-metadata';
import { DBConnection } from 'src/component/database/dbconnection/dbconnection';
import { EmployeeRecordService } from './EmployeeRecordService';
import { EmployeeDao } from 'src/infrastructure/datasource/emploee/EmployeeDao';
import { EmployeeDataSource } from 'src/infrastructure/datasource/emploee/EmployeeDataSource';
import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeRecordCoordinator } from 'src/application/coordinator/EmployeeRecordCoordinator';

describe('EmployeeRepository', () => {
    let module: TestingModule;
    let service: EmployeeRecordService;
    beforeAll(async () => {
        module = await Test.createTestingModule({
            providers: [
                EmployeeRecordService,
                EmployeeRecordCoordinator,
                { provide: 'ConnectionManager', useClass: DBConnection },
                { provide: 'EmployeeMapper', useClass: EmployeeDao },
                { provide: 'EmployeeRepository', useClass: EmployeeDataSource },
            ],
        }).compile();
        service = module.get(EmployeeRecordService);
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
