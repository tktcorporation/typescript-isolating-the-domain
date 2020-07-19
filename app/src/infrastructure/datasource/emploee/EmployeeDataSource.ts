import { EmployeeMapper } from './EmployeeMapper';
import { EmployeeRepository } from 'src/application/repository/EmployeeRepository';
import { EmployeeNumber } from 'src/domain/model/employee/EmployeeNumber';
import { Employee } from 'src/domain/model/employee/Employee';
import { Name } from 'src/domain/model/employee/Name';
import { MailAddress } from 'src/domain/model/employee/MailAddress';
import { PhoneNumber } from 'src/domain/model/employee/PhoneNumber';
import { ContractingEmployees } from 'src/domain/model/employee/ContractingEmployees';

export class EmployeeDataSource implements EmployeeRepository {
    private mapper: EmployeeMapper;

    choose = async (employeeNumber: EmployeeNumber): Promise<Employee> => {
        return this.mapper.selectByEmployeeNumber(employeeNumber);
    };

    findUnderContracts = async (): Promise<ContractingEmployees> => {
        return new ContractingEmployees(await this.mapper.selectContracts());
    };

    registerNew = async (): Promise<EmployeeNumber> => {
        const employeeNumber: EmployeeNumber = new EmployeeNumber(
            await this.mapper.newEmployeeNumber(),
        );
        this.mapper.insertEmployee(employeeNumber);
        return employeeNumber;
    };

    registerName = async (
        employeeNumber: EmployeeNumber,
        name: Name,
    ): Promise<void> => {
        const nameId: number = await this.mapper.newEmployeeNameIdentifier();
        this.mapper.insertEmployeeNameHistory(nameId, employeeNumber, name);
        this.mapper.deleteEmployeeName(employeeNumber);
        this.mapper.insertEmployeeName(employeeNumber, nameId, name);
    };

    registerMailAddress = async (
        employeeNumber: EmployeeNumber,
        mailAddress: MailAddress,
    ): Promise<void> => {
        const mailAddressId: number = await this.mapper.newEmployeeMailAddressIdentifier();
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
    };

    registerPhoneNumber = async (
        employeeNumber: EmployeeNumber,
        phoneNumber: PhoneNumber,
    ): Promise<void> => {
        const phoneNumberId: number = await this.mapper.newEmployeePhoneNumberIdentifier();
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
    };

    registerInspireContract = async (
        employeeNumber: EmployeeNumber,
    ): Promise<void> => {
        this.mapper.insertInspireContract(employeeNumber);
    };

    registerExpireContract = async (employee: Employee): Promise<void> => {
        this.mapper.deleteInspireContract(employee.employeeNumber());
        this.mapper.insertExpireContract(employee.employeeNumber());
    };

    constructor(mapper: EmployeeMapper) {
        this.mapper = mapper;
    }
}
