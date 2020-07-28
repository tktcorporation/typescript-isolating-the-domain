import {
    IsNotEmpty,
    MaxLength,
    IsEmail,
    IsPhoneNumber,
    MinLength,
} from 'class-validator';
import { Name } from 'src/domain/model/employee/Name';
import { EmployeeToRegister } from 'src/domain/model/employee/EmployeeToRegister';
import { MailAddress } from 'src/domain/model/employee/MailAddress';
import { PhoneNumber } from 'src/domain/model/employee/PhoneNumber';

export class EmployeeRegisterBody {
    @IsNotEmpty()
    @MaxLength(Name.字数制限)
    name: string;

    @IsNotEmpty()
    @IsEmail()
    mail_address: string;

    @IsNotEmpty()
    @IsPhoneNumber('JP')
    @MaxLength(13)
    @MinLength(8)
    phone_number: string;

    constructor(name: string, mail_address: string, phone_number: string) {
        this.name = name;
        this.mail_address = mail_address;
        this.phone_number = phone_number;
    }

    toDomain = (): EmployeeToRegister =>
        new EmployeeToRegister(
            new Name(this.name),
            new MailAddress(this.mail_address),
            new PhoneNumber(this.phone_number),
        );
}
