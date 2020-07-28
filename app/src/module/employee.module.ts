import { Module } from '@nestjs/common';
import { EmployeeController } from 'src/presentation/employee/EmployeeController';
import { EmployeeRecordService } from 'src/application/service/employee/EmployeeRecordService';
import { DBConnection } from 'src/component/database/dbconnection/dbconnection';
import { EmployeeDao } from 'src/infrastructure/datasource/emploee/EmployeeDao';
import { EmployeeDataSource } from 'src/infrastructure/datasource/emploee/EmployeeDataSource';
import { EmployeeRecordCoordinator } from 'src/application/coordinator/EmployeeRecordCoordinator';

@Module({
    providers: [
        EmployeeRecordService,
        EmployeeRecordCoordinator,
        { provide: 'ConnectionManager', useClass: DBConnection },
        { provide: 'EmployeeMapper', useClass: EmployeeDao },
        { provide: 'EmployeeRepository', useClass: EmployeeDataSource },
    ],
    controllers: [EmployeeController],
})
export class EmployeeModule {}
