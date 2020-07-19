import { Employee } from './Employee';

/**
 * 契約中従業員一覧
 */
export class ContractingEmployees {
    private _list: Array<Employee>;

    constructor(list: Array<Employee>) {
        this._list = list;
    }

    list(): Array<Employee> {
        return this._list;
    }

    toString(): string {
        return this._list.toString();
    }
}
