import { EmployeeRecordCoordinator } from 'src/application/coordinator/EmployeeRecordCoordinator';
import { EmployeeRegisterBody } from './request/EmployeeRegisterBody';
import { EmployeeNumberResponse } from './response/EmployeeNumberResponse';
import { Injectable, Controller, Post, Body } from '@nestjs/common';

@Injectable()
@Controller('/employees')
export class EmployeeController {
    constructor(
        private readonly recordCoordinator: EmployeeRecordCoordinator,
    ) {}

    @Post()
    async register(@Body() body: EmployeeRegisterBody): EmployeeNumberResponse {
        const employeeNumber = await this.recordCoordinator.register(
            body.toDomain(),
        );
        return new EmployeeNumberResponse(employeeNumber);
    }
}
