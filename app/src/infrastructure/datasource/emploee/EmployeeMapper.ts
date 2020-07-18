import { Employee } from 'src/domain/model/employee/Employee';
import { EmployeeNumber } from 'src/domain/model/employee/EmployeeNumber';
import { PhoneNumber } from 'src/domain/model/employee/PhoneNumber';
import { Name } from 'src/domain/model/employee/Name';
import { MailAddress } from 'src/domain/model/employee/MailAddress';

export interface EmployeeMapper {
    selectByEmployeeNumber(employeeNumber: EmployeeNumber): Employee;

    selectContracts(): Array<Employee>;

    insertEmployee(employeeNumber: EmployeeNumber): void;

    deleteEmployeeName(employeeNumber: EmployeeNumber): void;

    insertEmployeeNameHistory(
        id: number,
        employeeNumber: EmployeeNumber,
        name: Name,
    ): void;

    insertEmployeeName(
        employeeNumber: EmployeeNumber,
        nameId: number,
        employeeName: Name,
    ): void;

    deleteEmployeePhoneNumber(employeeNumber: EmployeeNumber): void;

    insertEmployeePhoneNumberHistory(
        id: number,
        employeeNumber: EmployeeNumber,
        phoneNumber: PhoneNumber,
    ): void;

    insertEmployeePhoneNumber(
        employeeNumber: EmployeeNumber,
        phoneId: number,
        phoneNumber: PhoneNumber,
    ): void;

    deleteEmployeeMailAddress(employeeNumber: EmployeeNumber): void;

    insertEmployeeMailAddressHistory(
        id: number,
        employeeNumber: EmployeeNumber,
        mailAddress: MailAddress,
    ): void;

    insertEmployeeMailAddress(
        employeeNumber: EmployeeNumber,
        mailAddressId: number,
        mailAddress: MailAddress,
    ): void;

    insertInspireContract(employeeNumber: EmployeeNumber): void;

    deleteInspireContract(employeeNumber: EmployeeNumber): void;

    insertExpireContract(employeeNumber: EmployeeNumber): void;

    newEmployeeNumber(): number;

    newEmployeeNameIdentifier(): number;

    newEmployeePhoneNumberIdentifier(): number;

    newEmployeeMailAddressIdentifier(): number;
}
