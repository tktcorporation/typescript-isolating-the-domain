import { Module } from '@nestjs/common';
import { EmployeeModule } from './module/employee.module';

@Module({
    imports: [EmployeeModule],
})
export class AppModule {}
