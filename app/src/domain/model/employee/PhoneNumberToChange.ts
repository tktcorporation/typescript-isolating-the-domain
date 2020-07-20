import { EmployeeNumber } from './EmployeeNumber';
import { PhoneNumber } from './PhoneNumber';

/**
 * 電話番号の変更
 */
export class PhoneNumberToChange {
    private _employeeNumber: EmployeeNumber;
    private _phoneNumber: PhoneNumber;

    constructor(employeeNumber: EmployeeNumber, phoneNumber: PhoneNumber) {
        this._employeeNumber = employeeNumber;
        this._phoneNumber = phoneNumber;
    }

    employeeNumber = (): EmployeeNumber => this._employeeNumber;
    phoneNumber = (): PhoneNumber => this._phoneNumber;
}
