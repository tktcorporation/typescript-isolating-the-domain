import { IsNotEmpty, MaxLength } from 'class-validator';

/**
 * 氏名
 */
export class Name {
    private static readonly 字数制限 = 40;

    @IsNotEmpty()
    @MaxLength(Name.字数制限)
    private _value: string;

    constructor();
    constructor(name: string);
    constructor(name?: string) {
        this._value = name ?? '';
    }

    toString(): string {
        return this._value;
    }
}
