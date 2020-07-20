import { Name } from './Name';
import { MailAddress } from './MailAddress';
import { PhoneNumber } from './PhoneNumber';
import { IsNotEmpty, ValidateNested } from 'class-validator';

/**
 * 従業員登録
 */
export class EmployeeToRegister {
    @IsNotEmpty()
    @ValidateNested()
    private _name: Name;

    @IsNotEmpty()
    @ValidateNested()
    private _mailAddress: MailAddress;

    @IsNotEmpty()
    @ValidateNested()
    private _phoneNumber: PhoneNumber;

    constructor(
        name: Name,
        mailAddress: MailAddress,
        phoneNumber: PhoneNumber,
    ) {
        this._name = name;
        this._mailAddress = mailAddress;
        this._phoneNumber = phoneNumber;
    }

    static blank(): EmployeeToRegister {
        return new EmployeeToRegister(
            new Name(),
            new MailAddress(),
            new PhoneNumber(),
        );
    }

    name(): Name {
        return this._name;
    }

    mailAddress(): MailAddress {
        return this._mailAddress;
    }

    phoneNumber(): PhoneNumber {
        return this._phoneNumber;
    }
}
