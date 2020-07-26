import { EmployeeNumber } from './EmployeeNumber';
import { Name } from './Name';
import { MailAddress } from './MailAddress';
import { PhoneNumber } from './PhoneNumber';

/**
 * 従業員
 */
export class Employee {
    private _employeeNumber: EmployeeNumber;
    private _name: Name;
    private _mailAddress: MailAddress;
    private _phoneNumber: PhoneNumber;

    constructor(params: {
        employeeNumber: EmployeeNumber;
        name: Name;
        mailAddress: MailAddress;
        phoneNumber: PhoneNumber;
    }) {
        this._employeeNumber = params?.employeeNumber;
        this._name = params?.name;
        this._mailAddress = params?.mailAddress;
        this._phoneNumber = params?.phoneNumber;
    }

    employeeNumber(): EmployeeNumber {
        return this._employeeNumber;
    }

    name(): Name {
        return this._name;
    }

    phoneNumber(): PhoneNumber {
        return this._phoneNumber;
    }

    mailAddress(): MailAddress {
        return this._mailAddress;
    }

    toString(): String {
        return (
            'Employee{' +
            'employeeNumber=' +
            this._employeeNumber +
            ', name=' +
            this._name +
            ', phoneNumber=' +
            this._phoneNumber +
            ', mailAddress=' +
            this._mailAddress +
            '}'
        );
    }
}
