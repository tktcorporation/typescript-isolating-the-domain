import {
    IsNotEmpty,
    IsPhoneNumber,
    MaxLength,
    MinLength,
} from 'class-validator';

/**
 * 電話番号
 */
export class PhoneNumber {
    @IsNotEmpty()
    @IsPhoneNumber('JP')
    @MaxLength(13)
    @MinLength(8)
    private _value = '';

    constructor();
    constructor(phoneNumber: string);
    constructor(phoneNumber?: string) {
        this._value = phoneNumber ?? '';
    }

    toString(): string {
        return this._value;
    }
}
