import 'reflect-metadata';
import { EmployeeRepository } from 'src/application/repository/EmployeeRepository';
import { EmployeeDataSource } from 'src/infrastructure/datasource/emploee/EmployeeDataSource';
import { DBConnection } from 'src/component/database/dbconnection';
import { EmployeeDao } from 'src/infrastructure/datasource/emploee/EmployeeDao';
import { QueryRunner } from 'typeorm';
import { container } from 'tsyringe';

container.register('ConnectionManager', { useClass: DBConnection });
container.register('EmployeeMapper', { useClass: EmployeeDao });

describe('EmployeeRepository', () => {
    let queryRunner: QueryRunner;
    let repository: EmployeeRepository;

    beforeAll(async () => {
        queryRunner = await DBConnection.getQueryRunner();
        repository = container.resolve(EmployeeDataSource);
        //     new EmployeeDataSource(
        //     new EmployeeDao(queryRunner.manager),
        // );
    });

    it('should be defined', () => {
        expect(repository).toBeDefined();
    });
    it('register new', async () => {
        const number = await repository.registerNew();
        console.log(number);
        const employee = await repository.choose(number);
        console.log(employee);
    });
    afterAll(async () => {
        await queryRunner.rollbackTransaction();
        await queryRunner.release();
        await DBConnection.close();
    });
});
