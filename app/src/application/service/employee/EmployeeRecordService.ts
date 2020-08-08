import { Inject, Injectable } from '@nestjs/common';
import { EmployeeRepository } from 'src/application/repository/EmployeeRepository';
import { EmployeeNumber } from 'src/domain/model/employee/EmployeeNumber';
import { Employee } from 'src/domain/model/employee/Employee';
import { MailAddressToChange } from 'src/domain/model/employee/MailAddressToChange';
import { NameToChange } from 'src/domain/model/employee/NameToChange';
import { PhoneNumberToChange } from 'src/domain/model/employee/PhoneNumberToChange';
import { Transact } from 'src/component/database/dbconnection/dbconnection';

/**
 * 従業員登録更新サービス
 */
@Injectable()
export class EmployeeRecordService {
    constructor(
        @Inject('EmployeeRepository')
        private employeeRepository: EmployeeRepository,
    ) {}

    /**
     * 従業員契約準備
     */
    @Transact()
    prepareNewContract(): Promise<EmployeeNumber> {
        return this.employeeRepository.registerNew();
    }

    /**
     * 従業員名登録
     */
    @Transact()
    registerName(name: NameToChange): Promise<void> {
        return this.employeeRepository.registerName(
            name.employeeNumber(),
            name.name(),
        );
    }

    /**
     * 従業員メールアドレス登録
     */
    @Transact()
    registerMailAddress(mail: MailAddressToChange): Promise<void> {
        return this.employeeRepository.registerMailAddress(
            mail.employeeNumber(),
            mail.mailAddress(),
        );
    }

    /**
     * 従業員電話番号登録
     */
    @Transact()
    registerPhoneNumber(phone: PhoneNumberToChange): Promise<void> {
        return this.employeeRepository.registerPhoneNumber(
            phone.employeeNumber(),
            phone.phoneNumber(),
        );
    }

    /**
     * 従業員契約開始
     */
    @Transact()
    inspireContract(employeeNumber: EmployeeNumber): Promise<void> {
        return this.employeeRepository.registerInspireContract(employeeNumber);
    }

    /**
     * 従業員契約終了
     */
    @Transact()
    expireContract(employee: Employee): Promise<void> {
        return this.employeeRepository.registerExpireContract(employee);
    }
}
