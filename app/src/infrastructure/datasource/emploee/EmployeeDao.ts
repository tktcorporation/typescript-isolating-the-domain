import { EmployeeMapper } from './EmployeeMapper';
import { EmployeeNumber } from 'src/domain/model/employee/EmployeeNumber';
import { EntityManager } from 'typeorm';
import { Employee } from 'src/domain/model/employee/Employee';
import { Name } from 'src/domain/model/employee/Name';
import { PhoneNumber } from 'src/domain/model/employee/PhoneNumber';
import { MailAddress } from 'src/domain/model/employee/MailAddress';

export class EmployeeDao implements EmployeeMapper {
    private manager: EntityManager;
    private static selectEmployee: string = `
        SELECT
            "EMPLOYEE_ID" AS "employeeNumberValue",
            "EMPLOYEE_NAME"."EMPLOYEE_NAME" AS "nameValue",
            "EMPLOYEE_MAIL_ADDRESS"."MAIL_ADDRESS" AS "mailAddressValue",
            "EMPLOYEE_PHONE_NUMBER"."PHONE_NUMBER" AS "phoneNumberValue"
        FROM
            "EMPLOYEES" AS "EMPLOYEE"
            INNER JOIN "EMPLOYEE_NAMES" AS "EMPLOYEE_NAME" ON ("EMPLOYEE_ID" = "EMPLOYEE_NAME"."EMPLOYEE_ID")
            INNER JOIN "EMPLOYEE_PHONE_NUMBERS" AS "EMPLOYEE_PHONE_NUMBER" ON ("EMPLOYEE_ID" = "EMPLOYEE_PHONE_NUMBER"."EMPLOYEE_ID")
            INNER JOIN "EMPLOYEE_MAIL_ADDRESSES" AS "EMPLOYEE_MAIL_ADDRESS" ON ("EMPLOYEE_ID" = "EMPLOYEE_MAIL_ADDRESS"."EMPLOYEE_ID")
            INNER JOIN "UNDER_CONTRACTS" AS "UNDER_CONTRACT" ON ("EMPLOYEE_ID" = "UNDER_CONTRACT"."EMPLOYEE_ID")`;
    constructor(manager: EntityManager) {
        this.manager = manager;
    }

    selectByEmployeeNumber = async (
        employeeNumber: EmployeeNumber,
    ): Promise<Employee> => {
        const result: [
            {
                employeeNumberValue: number;
                nameValue: string;
                mailAddressValue: string;
                phoneNumberValue: string;
            },
        ] = await this.manager.query(
            `${EmployeeDao.selectEmployee} WHERE "EMPLOYEE"."EMPLOYEE_ID" = $1;`,
            [employeeNumber],
        );
        return new Employee(
            ((params: {
                employeeNumberValue: number;
                nameValue: string;
                mailAddressValue: string;
                phoneNumberValue: string;
            }) => ({
                employeeNumber: new EmployeeNumber(params.employeeNumberValue),
                name: new Name(params.nameValue),
                mailAddress: new MailAddress(params.mailAddressValue),
                phoneNumber: new PhoneNumber(params.phoneNumberValue),
            }))(result[0]),
        );
    };

    selectContracts = async (): Promise<Array<Employee>> => {
        const result: Array<{
            employeeNumberValue: number;
            nameValue: string;
            mailAddressValue: string;
            phoneNumberValue: string;
        }> = await this.manager.query(
            `${EmployeeDao.selectEmployee} ORDER BY "EMPLOYEE"."EMPLOYEE_ID";`,
        );
        return result.map(
            (params) =>
                new Employee({
                    employeeNumber: new EmployeeNumber(
                        params.employeeNumberValue,
                    ),
                    name: new Name(params.nameValue),
                    mailAddress: new MailAddress(params.mailAddressValue),
                    phoneNumber: new PhoneNumber(params.phoneNumberValue),
                }),
        );
    };

    insertEmployee = async (employeeNumber: EmployeeNumber): Promise<void> => {
        await this.manager.query(
            `INSERT INTO "EMPLOYEES" ("EMPLOYEE_ID") VALUES ($1);`,
            [employeeNumber],
        );
    };

    deleteEmployeeName = async (
        employeeNumber: EmployeeNumber,
    ): Promise<void> => {
        await this.manager.query(
            `DELETE FROM "EMPLOYEE_NAME" WHERE "EMPLOYEE_ID" = $1`,
            [employeeNumber],
        );
    };

    insertEmployeeNameHistory = async (
        id: number,
        employeeNumber: EmployeeNumber,
        name: Name,
    ): Promise<void> => {
        await this.manager.query(
            `
            INSERT INTO "EMPLOYEE_NAME_HISTORIES" ("EMPLOYEE_NAME_ID", "EMPLOYEE_ID", "EMPLOYEE_NAME")
            VALUES ($1, $2, $3);`,
            [id, employeeNumber, name],
        );
    };

    insertEmployeeName = async (
        employeeNumber: EmployeeNumber,
        nameId: number,
        employeeName: Name,
    ): Promise<void> => {
        await this.manager.query(
            `
            INSERT INTO "EMPLOYEE_NAME_HISTORIES" ("EMPLOYEE_ID", "EMPLOYEE_NAME_ID", "EMPLOYEE_NAME")
            VALUES ($1, $2, $3);`,
            [employeeNumber, nameId, employeeName],
        );
    };

    deleteEmployeePhoneNumber = async (
        employeeNumber: EmployeeNumber,
    ): Promise<void> => {
        await this.manager.query(
            `DELETE FROM "EMPLOYEE_PHONE_NUMBER" WHERE "EMPLOYEE_ID" = $1`,
            [employeeNumber],
        );
    };

    insertEmployeePhoneNumberHistory = async (
        id: number,
        employeeNumber: EmployeeNumber,
        phoneNumber: PhoneNumber,
    ): Promise<void> => {
        await this.manager.query(
            `
            INSERT INTO "EMPLOYEE_PHONE_NUMBER_HISTORIES" ("EMPLOYEE_PHONE_NUMBER_ID", "EMPLOYEE_ID", "EMPLOYEE_PHONE_NUMBER")
            VALUES ($1, $2, $3);`,
            [id, employeeNumber, phoneNumber],
        );
    };

    insertEmployeePhoneNumber = async (
        employeeNumber: EmployeeNumber,
        phoneId: number,
        phoneNumber: PhoneNumber,
    ): Promise<void> => {
        await this.manager.query(
            `INSERT INTO "EMPLOYEE_PHONE_NUMBERS" ("EMPLOYEE_ID", "EMPLOYEE_PHONE_NUMBER_ID", "EMPLOYEE_PHONE_NUMBER")`,
            [employeeNumber, phoneId, phoneNumber],
        );
    };

    deleteEmployeeMailAddress = async (
        employeeNumber: EmployeeNumber,
    ): Promise<void> => {
        await this.manager.query(
            `DELETE FROM "EMPLOYEE_MAIL_ADDRESS" WHERE "EMPLOYEE_ID" = $1`,
            [employeeNumber],
        );
    };

    insertEmployeeMailAddressHistory = async (
        id: number,
        employeeNumber: EmployeeNumber,
        mailAddress: MailAddress,
    ): Promise<void> => {
        await this.manager.query(
            `
            INSERT INTO "EMPLOYEE_MAIL_ADDRESS_HISTORIES" ("EMPLOYEE_MAIL_ADDRESS_ID", "EMPLOYEE_ID", "EMPLOYEE_MAIL_ADDRESS")
            VALUES ($1, $2, $3);`,
            [id, employeeNumber, mailAddress],
        );
    };

    insertEmployeeMailAddress = async (
        employeeNumber: EmployeeNumber,
        mailAddressId: number,
        mailAddress: MailAddress,
    ): Promise<void> => {
        await this.manager.query(
            `
            INSERT INTO "EMPLOYEE_MAIL_ADDRESSES" ("EMPLOYEE_ID", "EMPLOYEE_MAIL_ADDRESS_ID", "MAIL_ADDRESS")
            VALUES ($1, $2, $3);`,
            [employeeNumber, mailAddressId, mailAddress],
        );
    };

    insertInspireContract = async (
        employeeNumber: EmployeeNumber,
    ): Promise<void> => {
        await this.manager.query(
            `
            INSERT INTO "INSPIRED_CONTRACTS" ("EMPLOYEE_ID")
            VALUES ($1);`,
            [employeeNumber],
        );
    };

    deleteInspireContract = async (
        employeeNumber: EmployeeNumber,
    ): Promise<void> => {
        await this.manager.query(
            `DELETE FROM "INSPIRED_CONTRACT" WHERE "EMPLOYEE_ID" = $1`,
            [employeeNumber],
        );
    };

    insertExpireContract = async (
        employeeNumber: EmployeeNumber,
    ): Promise<void> => {
        await this.manager.query(
            `DELETE FROM "EXPIRED_CONTRACT" WHERE "EMPLOYEE_ID" = $1`,
            [employeeNumber],
        );
    };

    newEmployeeNumber = async (): Promise<number> => {
        const result = await this.manager.query(
            `select nextval("EMPLOYEE_ID")`,
        );
        return result[0];
    };

    newEmployeeNameIdentifier = async (): Promise<number> => {
        const result = await this.manager.query(
            `select nextval("EMPLOYEE_NAME_ID")`,
        );
        return result[0];
    };

    newEmployeePhoneNumberIdentifier = async (): Promise<number> => {
        const result = await this.manager.query(
            `select nextval("EMPLOYEE_PHONE_NUMBER_ID")`,
        );
        return result[0];
    };

    newEmployeeMailAddressIdentifier = async (): Promise<number> => {
        const result = await this.manager.query(
            `select nextval("EMPLOYEE_MAIL_ADDRESS_ID")`,
        );
        return result[0];
    };
}
