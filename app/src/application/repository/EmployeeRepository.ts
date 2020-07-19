import { EmployeeNumber } from 'src/domain/model/employee/EmployeeNumber';
import { Employee } from 'src/domain/model/employee/Employee';
import { PhoneNumber } from 'src/domain/model/employee/PhoneNumber';
import { MailAddress } from 'src/domain/model/employee/MailAddress';
import { Name } from 'src/domain/model/employee/Name';

/**
 * 従業員リポジトリ
 */
export interface EmployeeRepository {
    choose(employeeNumber: EmployeeNumber): Promise<Employee>;

    // findUnderContracts(): Promise<ContractingEmployees>;

    registerName(employeeNumber: EmployeeNumber, name: Name): Promise<void>;

    registerMailAddress(
        employeeNumber: EmployeeNumber,
        mailAddress: MailAddress,
    ): Promise<void>;

    registerPhoneNumber(
        employeeNumber: EmployeeNumber,
        phoneNumber: PhoneNumber,
    ): Promise<void>;

    registerInspireContract(employeeNumber: EmployeeNumber): Promise<void>;

    registerExpireContract(employee: Employee): Promise<void>;

    registerNew(): Promise<EmployeeNumber>;
}
