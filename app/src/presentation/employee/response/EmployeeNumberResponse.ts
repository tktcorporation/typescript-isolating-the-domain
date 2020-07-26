import { EmployeeNumber } from 'src/domain/model/employee/EmployeeNumber';

export class EmployeeNumberResponse {
    readonly employee_number: number;

    constructor(employeeNumber: EmployeeNumber) {
        this.employee_number = employeeNumber.value();
    }
}
