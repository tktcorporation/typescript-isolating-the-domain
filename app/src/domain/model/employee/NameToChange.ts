import { EmployeeNumber } from './EmployeeNumber';
import { Name } from './Name';

/**
 * 氏名の変更
 */
export class NameToChange {
    private _employeeNumber: EmployeeNumber;
    private _name: Name;

    constructor(employeeNumber: EmployeeNumber, name: Name) {
        this._employeeNumber = employeeNumber;
        this._name = name;
    }

    employeeNumber(): EmployeeNumber {
        return this._employeeNumber;
    }

    name(): Name {
        return this._name;
    }
}
