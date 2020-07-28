import { IsNotEmpty, IsEmail } from 'class-validator';

/**
 * メールアドレス
 */
export class MailAddress {
    @IsNotEmpty()
    @IsEmail()
    private _value = '';

    constructor();
    constructor(mailAddress: string);
    constructor(mailAddress?: string) {
        this._value = mailAddress ?? '';
    }

    toString(): string {
        return this._value;
    }
}
