import { EmployeeNumber } from 'src/domain/model/employee/EmployeeNumber';
import { Employee } from 'src/domain/model/employee/Employee';
import { PhoneNumber } from 'src/domain/model/employee/PhoneNumber';
import { MailAddress } from 'src/domain/model/employee/MailAddress';
import { Name } from 'src/domain/model/employee/Name';

/**
 * 従業員リポジトリ
 */
export interface EmployeeRepository {
    choose(employeeNumber: EmployeeNumber): Employee;

    // findUnderContracts(): ContractingEmployees;

    registerName(employeeNumber: EmployeeNumber, name: Name): void;

    registerMailAddress(
        employeeNumber: EmployeeNumber,
        mailAddress: MailAddress,
    ): void;

    registerPhoneNumber(
        employeeNumber: EmployeeNumber,
        phoneNumber: PhoneNumber,
    ): void;

    registerInspireContract(employeeNumber: EmployeeNumber): void;

    registerExpireContract(employee: Employee): void;

    registerNew(): EmployeeNumber;
}
