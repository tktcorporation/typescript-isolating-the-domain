/**
 * 従業員番号
 */
export class EmployeeNumber {
    private _value: number;

    static from = (value: string) => new EmployeeNumber(Number.parseInt(value));

    constructor(value: number) {
        this._value = value;
    }

    value(): number {
        return this._value;
    }

    toString(): string {
        return this._value.toString();
    }
}
