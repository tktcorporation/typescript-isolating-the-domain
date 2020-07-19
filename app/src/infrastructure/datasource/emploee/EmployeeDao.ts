import { EmployeeMapper } from './EmployeeMapper';
import { EmployeeNumber } from 'src/domain/model/employee/EmployeeNumber';
import { EntityManager } from 'typeorm';
import { Employee } from 'src/domain/model/employee/Employee';
import { Name } from 'src/domain/model/employee/Name';
import { PhoneNumber } from 'src/domain/model/employee/PhoneNumber';
import { MailAddress } from 'src/domain/model/employee/MailAddress';

export class EmployeeDao implements EmployeeMapper {
    private manager: EntityManager;
    constructor(manager: EntityManager) {
        this.manager = manager;
    }

    selectByEmployeeNumber = async (
        employeeNumber: EmployeeNumber,
    ): Promise<Employee> => {};

    selectContracts = async (): Promise<Array<Employee>> => {};

    insertEmployee = async (
        employeeNumber: EmployeeNumber,
    ): Promise<void> => {};

    deleteEmployeeName = async (
        employeeNumber: EmployeeNumber,
    ): Promise<void> => {};

    insertEmployeeNameHistory = async (
        id: number,
        employeeNumber: EmployeeNumber,
        name: Name,
    ): Promise<void> => {};

    insertEmployeeName = async (
        employeeNumber: EmployeeNumber,
        nameId: number,
        employeeName: Name,
    ): Promise<void> => {};

    deleteEmployeePhoneNumber = async (
        employeeNumber: EmployeeNumber,
    ): Promise<void> => {};

    insertEmployeePhoneNumberHistory = async (
        id: number,
        employeeNumber: EmployeeNumber,
        phoneNumber: PhoneNumber,
    ): Promise<void> => {};

    insertEmployeePhoneNumber = async (
        employeeNumber: EmployeeNumber,
        phoneId: number,
        phoneNumber: PhoneNumber,
    ): Promise<void> => {};

    deleteEmployeeMailAddress = async (
        employeeNumber: EmployeeNumber,
    ): Promise<void> => {};

    insertEmployeeMailAddressHistory = async (
        id: number,
        employeeNumber: EmployeeNumber,
        mailAddress: MailAddress,
    ): Promise<void> => {};

    insertEmployeeMailAddress = async (
        employeeNumber: EmployeeNumber,
        mailAddressId: number,
        mailAddress: MailAddress,
    ): Promise<void> => {};

    insertInspireContract = async (
        employeeNumber: EmployeeNumber,
    ): Promise<void> => {};

    deleteInspireContract = async (
        employeeNumber: EmployeeNumber,
    ): Promise<void> => {};

    insertExpireContract = async (
        employeeNumber: EmployeeNumber,
    ): Promise<void> => {};

    newEmployeeNumber = async (): Promise<number> => {};

    newEmployeeNameIdentifier = async (): Promise<number> => {};

    newEmployeePhoneNumberIdentifier = async (): Promise<number> => {};

    newEmployeeMailAddressIdentifier = async (): Promise<number> => {};
}
