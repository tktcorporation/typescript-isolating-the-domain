import 'reflect-metadata';
import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeController } from './EmployeeController';
import { container } from 'tsyringe';
import { EmployeeRegisterBody } from './request/EmployeeRegisterBody';
import { DBConnection } from 'src/component/database/dbconnection/dbconnection';
import { EmployeeDao } from 'src/infrastructure/datasource/emploee/EmployeeDao';
import { EmployeeDataSource } from 'src/infrastructure/datasource/emploee/EmployeeDataSource';
import { EmployeeRecordService } from 'src/application/service/employee/EmployeeRecordService';
import { EmployeeModule } from 'src/module/employee.module';

describe('EmployeeController', () => {
    let controller: EmployeeController;
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [EmployeeModule],
        }).compile();
        controller = module.get<EmployeeController>(EmployeeController);
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
