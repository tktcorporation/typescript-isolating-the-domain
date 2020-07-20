import { EmployeeRepository } from 'src/application/repository/EmployeeRepository';
import { inject, injectable } from 'tsyringe';
import { EmployeeNumber } from 'src/domain/model/employee/EmployeeNumber';
import { Employee } from 'src/domain/model/employee/Employee';
import { MailAddressToChange } from 'src/domain/model/employee/MailAddressToChange';
import { NameToChange } from 'src/domain/model/employee/NameToChange';
import { PhoneNumberToChange } from 'src/domain/model/employee/PhoneNumberToChange';

/**
 * 従業員登録更新サービス
 */
@injectable()
export class EmployeeRecordService {
    constructor(
        @inject('EmployeeRepository')
        private employeeRepository: EmployeeRepository,
    ) {}

    /**
     * 従業員契約準備
     */
    prepareNewContract = async (): Promise<EmployeeNumber> =>
        this.employeeRepository.registerNew();

    /**
     * 従業員名登録
     */
    registerName = async (name: NameToChange): Promise<void> =>
        this.employeeRepository.registerName(
            name.employeeNumber(),
            name.name(),
        );

    /**
     * 従業員メールアドレス登録
     */
    registerMailAddress = async (mail: MailAddressToChange): Promise<void> =>
        this.employeeRepository.registerMailAddress(
            mail.employeeNumber(),
            mail.mailAddress(),
        );

    /**
     * 従業員電話番号登録
     */
    registerPhoneNumber = async (phone: PhoneNumberToChange): Promise<void> =>
        this.employeeRepository.registerPhoneNumber(
            phone.employeeNumber(),
            phone.phoneNumber(),
        );

    /**
     * 従業員契約開始
     */
    inspireContract = async (employeeNumber: EmployeeNumber): Promise<void> =>
        this.employeeRepository.registerInspireContract(employeeNumber);

    /**
     * 従業員契約終了
     */
    expireContract = async (employee: Employee): Promise<void> =>
        this.employeeRepository.registerExpireContract(employee);
}
