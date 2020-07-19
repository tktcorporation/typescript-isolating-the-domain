import { Employee } from 'src/domain/model/employee/Employee';
import { EmployeeNumber } from 'src/domain/model/employee/EmployeeNumber';
import { PhoneNumber } from 'src/domain/model/employee/PhoneNumber';
import { Name } from 'src/domain/model/employee/Name';
import { MailAddress } from 'src/domain/model/employee/MailAddress';

export interface EmployeeMapper {
    selectByEmployeeNumber(
        employeeNumber: EmployeeNumber,
    ): Promise<Employee | undefined>;

    selectContracts(): Promise<Array<Employee>>;

    insertEmployee(employeeNumber: EmployeeNumber): Promise<void>;

    deleteEmployeeName(employeeNumber: EmployeeNumber): Promise<void>;

    insertEmployeeNameHistory(
        id: number,
        employeeNumber: EmployeeNumber,
        name: Name,
    ): Promise<void>;

    insertEmployeeName(
        employeeNumber: EmployeeNumber,
        nameId: number,
        employeeName: Name,
    ): Promise<void>;

    deleteEmployeePhoneNumber(employeeNumber: EmployeeNumber): Promise<void>;

    insertEmployeePhoneNumberHistory(
        id: number,
        employeeNumber: EmployeeNumber,
        phoneNumber: PhoneNumber,
    ): Promise<void>;

    insertEmployeePhoneNumber(
        employeeNumber: EmployeeNumber,
        phoneId: number,
        phoneNumber: PhoneNumber,
    ): Promise<void>;

    deleteEmployeeMailAddress(employeeNumber: EmployeeNumber): Promise<void>;

    insertEmployeeMailAddressHistory(
        id: number,
        employeeNumber: EmployeeNumber,
        mailAddress: MailAddress,
    ): Promise<void>;

    insertEmployeeMailAddress(
        employeeNumber: EmployeeNumber,
        mailAddressId: number,
        mailAddress: MailAddress,
    ): Promise<void>;

    insertInspireContract(employeeNumber: EmployeeNumber): Promise<void>;

    deleteInspireContract(employeeNumber: EmployeeNumber): Promise<void>;

    insertExpireContract(employeeNumber: EmployeeNumber): Promise<void>;

    newEmployeeNumber(): Promise<number>;

    newEmployeeNameIdentifier(): Promise<number>;

    newEmployeePhoneNumberIdentifier(): Promise<number>;

    newEmployeeMailAddressIdentifier(): Promise<number>;
}
