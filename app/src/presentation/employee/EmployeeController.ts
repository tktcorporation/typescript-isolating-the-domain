import { injectable } from 'tsyringe';
import { Post, Body, JsonController } from 'routing-controllers';
import { EmployeeToRegister } from 'src/domain/model/employee/EmployeeToRegister';
import { EmployeeRecordCoordinator } from 'src/application/coordinator/EmployeeRecordCoordinator';
import { EmployeeRegisterBody } from './request/EmployeeRegisterBody';
import { EmployeeNumberResponse } from './response/EmployeeNumberResponse';

@injectable()
@JsonController('/employees')
export class EmployeeController {
    constructor(
        private readonly recordCoordinator: EmployeeRecordCoordinator,
    ) {}

    @Post()
    async register(@Body() body: EmployeeRegisterBody) {
        const employeeNumber = await this.recordCoordinator.register(
            body.toDomain(),
        );
        return new EmployeeNumberResponse(employeeNumber);
    }
}
