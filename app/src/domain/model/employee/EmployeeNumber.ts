/**
 * 従業員番号
 */
export class EmployeeNumber {
    private _value?: number;

    static from = (value: string) => new EmployeeNumber(Number.parseInt(value));

    constructor();
    constructor(value: number);
    constructor(value?: number) {
        this._value = value;
    }

    value(): number | undefined {
        return this._value;
    }

    toString(): string | undefined {
        return this._value?.toString();
    }
}
