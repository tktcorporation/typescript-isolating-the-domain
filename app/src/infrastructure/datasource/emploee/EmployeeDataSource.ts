import { EmployeeMapper } from './EmployeeMapper';
import { EmployeeRepository } from 'src/application/repository/EmployeeRepository';
import { EmployeeNumber } from 'src/domain/model/employee/EmployeeNumber';
import { Employee } from 'src/domain/model/employee/Employee';
import { Name } from 'src/domain/model/employee/Name';
import { MailAddress } from 'src/domain/model/employee/MailAddress';
import { PhoneNumber } from 'src/domain/model/employee/PhoneNumber';
import { ContractingEmployees } from 'src/domain/model/employee/ContractingEmployees';
import { injectable, inject } from 'tsyringe';

@injectable()
export class EmployeeDataSource implements EmployeeRepository {
    constructor(@inject('EmployeeMapper') private mapper: EmployeeMapper) {}

    choose = (employeeNumber: EmployeeNumber): Promise<Employee | undefined> =>
        this.mapper.selectByEmployeeNumber(employeeNumber);

    findUnderContracts = async (): Promise<ContractingEmployees> => {
        return new ContractingEmployees(await this.mapper.selectContracts());
    };

    registerNew = async (): Promise<EmployeeNumber> => {
        const employeeNumber: EmployeeNumber = new EmployeeNumber(
            await this.mapper.newEmployeeNumber(),
        );
        await this.mapper.insertEmployee(employeeNumber);
        return employeeNumber;
    };

    registerName = async (
        employeeNumber: EmployeeNumber,
        name: Name,
    ): Promise<void> => {
        const nameId: number = await this.mapper.newEmployeeNameIdentifier();
        await this.mapper.insertEmployeeNameHistory(
            nameId,
            employeeNumber,
            name,
        );
        await this.mapper.deleteEmployeeName(employeeNumber);
        await this.mapper.insertEmployeeName(employeeNumber, nameId, name);
    };

    registerMailAddress = async (
        employeeNumber: EmployeeNumber,
        mailAddress: MailAddress,
    ): Promise<void> => {
        const mailAddressId: number = await this.mapper.newEmployeeMailAddressIdentifier();
        await this.mapper.insertEmployeeMailAddressHistory(
            mailAddressId,
            employeeNumber,
            mailAddress,
        );
        await this.mapper.deleteEmployeeMailAddress(employeeNumber);
        await this.mapper.insertEmployeeMailAddress(
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
        await this.mapper.insertEmployeePhoneNumberHistory(
            phoneNumberId,
            employeeNumber,
            phoneNumber,
        );
        await this.mapper.deleteEmployeePhoneNumber(employeeNumber);
        await this.mapper.insertEmployeePhoneNumber(
            employeeNumber,
            phoneNumberId,
            phoneNumber,
        );
    };

    registerInspireContract = async (
        employeeNumber: EmployeeNumber,
    ): Promise<void> => {
        await this.mapper.insertInspireContract(employeeNumber);
    };

    registerExpireContract = async (employee: Employee): Promise<void> => {
        await this.mapper.deleteInspireContract(employee.employeeNumber());
        await this.mapper.insertExpireContract(employee.employeeNumber());
    };
}
