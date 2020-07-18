import { EmployeeMapper } from './EmployeeMapper';
import { EmployeeRepository } from 'src/application/repository/EmployeeRepository';
import { EmployeeNumber } from 'src/domain/model/employee/EmployeeNumber';
import { Employee } from 'src/domain/model/employee/Employee';
import { Name } from 'src/domain/model/employee/Name';
import { MailAddress } from 'src/domain/model/employee/MailAddress';
import { PhoneNumber } from 'src/domain/model/employee/PhoneNumber';

export class EmployeeDataSource implements EmployeeRepository {
    private mapper: EmployeeMapper;

    choose(employeeNumber: EmployeeNumber): Employee {
        return this.mapper.selectByEmployeeNumber(employeeNumber);
    }

    // findUnderContracts(): ContractingEmployees {
    //     return new ContractingEmployees(this.mapper.selectContracts());
    // }

    registerNew(): EmployeeNumber {
        const employeeNumber: EmployeeNumber = new EmployeeNumber(
            this.mapper.newEmployeeNumber(),
        );
        this.mapper.insertEmployee(employeeNumber);
        return employeeNumber;
    }

    registerName(employeeNumber: EmployeeNumber, name: Name): void {
        const nameId: number = this.mapper.newEmployeeNameIdentifier();
        this.mapper.insertEmployeeNameHistory(nameId, employeeNumber, name);
        this.mapper.deleteEmployeeName(employeeNumber);
        this.mapper.insertEmployeeName(employeeNumber, nameId, name);
    }

    registerMailAddress(
        employeeNumber: EmployeeNumber,
        mailAddress: MailAddress,
    ): void {
        const mailAddressId: number = this.mapper.newEmployeeMailAddressIdentifier();
        this.mapper.insertEmployeeMailAddressHistory(
            mailAddressId,
            employeeNumber,
            mailAddress,
        );
        this.mapper.deleteEmployeeMailAddress(employeeNumber);
        this.mapper.insertEmployeeMailAddress(
            employeeNumber,
            mailAddressId,
            mailAddress,
        );
    }

    registerPhoneNumber(
        employeeNumber: EmployeeNumber,
        phoneNumber: PhoneNumber,
    ): void {
        const phoneNumberId: number = this.mapper.newEmployeePhoneNumberIdentifier();
        this.mapper.insertEmployeePhoneNumberHistory(
            phoneNumberId,
            employeeNumber,
            phoneNumber,
        );
        this.mapper.deleteEmployeePhoneNumber(employeeNumber);
        this.mapper.insertEmployeePhoneNumber(
            employeeNumber,
            phoneNumberId,
            phoneNumber,
        );
    }

    registerInspireContract(employeeNumber: EmployeeNumber): void {
        this.mapper.insertInspireContract(employeeNumber);
    }

    registerExpireContract(employee: Employee): void {
        this.mapper.deleteInspireContract(employee.employeeNumber());
        this.mapper.insertExpireContract(employee.employeeNumber());
    }

    constructor(mapper: EmployeeMapper) {
        this.mapper = mapper;
    }
}
