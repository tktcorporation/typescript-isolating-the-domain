import { EmployeeRecordService } from '../service/employee/EmployeeRecordService';
import { EmployeeNumber } from 'src/domain/model/employee/EmployeeNumber';
import { EmployeeToRegister } from 'src/domain/model/employee/EmployeeToRegister';
import { NameToChange } from 'src/domain/model/employee/NameToChange';
import { MailAddressToChange } from 'src/domain/model/employee/MailAddressToChange';
import { PhoneNumberToChange } from 'src/domain/model/employee/PhoneNumberToChange';
import { Injectable } from '@nestjs/common';

/**
 * 従業員登録コーディネーター
 */
@Injectable()
export class EmployeeRecordCoordinator {
    constructor(private employeeRecordService: EmployeeRecordService) {}

    /**
     * 従業員登録
     */
    register = async (
        employeeToRegister: EmployeeToRegister,
    ): Promise<EmployeeNumber> => {
        const employeeNumber: EmployeeNumber = await this.employeeRecordService.prepareNewContract();
        await this.employeeRecordService.registerName(
            new NameToChange(employeeNumber, employeeToRegister.name()),
        );
        await this.employeeRecordService.registerMailAddress(
            new MailAddressToChange(
                employeeNumber,
                employeeToRegister.mailAddress(),
            ),
        );
        await this.employeeRecordService.registerPhoneNumber(
            new PhoneNumberToChange(
                employeeNumber,
                employeeToRegister.phoneNumber(),
            ),
        );
        await this.employeeRecordService.inspireContract(employeeNumber);
        return employeeNumber;
    };
}
