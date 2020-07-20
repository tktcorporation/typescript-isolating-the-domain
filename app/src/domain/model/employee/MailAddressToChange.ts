import { EmployeeNumber } from './EmployeeNumber';
import { MailAddress } from './MailAddress';

/**
 * メールアドレスの変更
 */
export class MailAddressToChange {
    private _employeeNumber: EmployeeNumber;
    private _mailAddress: MailAddress;

    constructor(employeeNumber: EmployeeNumber, mailAddress: MailAddress) {
        this._employeeNumber = employeeNumber;
        this._mailAddress = mailAddress;
    }

    employeeNumber(): EmployeeNumber {
        return this._employeeNumber;
    }

    mailAddress(): MailAddress {
        return this._mailAddress;
    }
}
