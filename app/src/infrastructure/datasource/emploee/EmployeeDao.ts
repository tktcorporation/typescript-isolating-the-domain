import { EmployeeMapper } from './EmployeeMapper';
import { EmployeeNumber } from 'src/domain/model/employee/EmployeeNumber';
import { Employee } from 'src/domain/model/employee/Employee';
import { Name } from 'src/domain/model/employee/Name';
import { PhoneNumber } from 'src/domain/model/employee/PhoneNumber';
import { MailAddress } from 'src/domain/model/employee/MailAddress';
import { ConnectionManager } from '../ConnectionManager';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class EmployeeDao implements EmployeeMapper {
    constructor(
        @Inject('ConnectionManager')
        private connectionManager: ConnectionManager,
    ) {}

    private static selectEmployee: string = `
        SELECT
            "EMPLOYEE"."EMPLOYEE_ID" AS "employeeNumberValue",
            "EMPLOYEE_NAME"."EMPLOYEE_NAME" AS "nameValue",
            "EMPLOYEE_MAIL_ADDRESS"."MAIL_ADDRESS" AS "mailAddressValue",
            "EMPLOYEE_PHONE_NUMBER"."PHONE_NUMBER" AS "phoneNumberValue"
        FROM
            "EMPLOYEES" AS "EMPLOYEE"
            INNER JOIN "EMPLOYEE_NAMES" AS "EMPLOYEE_NAME" ON ("EMPLOYEE"."EMPLOYEE_ID" = "EMPLOYEE_NAME"."EMPLOYEE_ID")
            INNER JOIN "EMPLOYEE_PHONE_NUMBERS" AS "EMPLOYEE_PHONE_NUMBER" ON ("EMPLOYEE"."EMPLOYEE_ID" = "EMPLOYEE_PHONE_NUMBER"."EMPLOYEE_ID")
            INNER JOIN "EMPLOYEE_MAIL_ADDRESSES" AS "EMPLOYEE_MAIL_ADDRESS" ON ("EMPLOYEE"."EMPLOYEE_ID" = "EMPLOYEE_MAIL_ADDRESS"."EMPLOYEE_ID")
            INNER JOIN "INSPIRED_CONTRACTS" AS "UNDER_CONTRACT" ON ("EMPLOYEE"."EMPLOYEE_ID" = "UNDER_CONTRACT"."EMPLOYEE_ID")`;

    selectByEmployeeNumber = async (
        employeeNumber: EmployeeNumber,
    ): Promise<Employee | undefined> => {
        const result: [
            {
                employeeNumberValue: number;
                nameValue: string;
                mailAddressValue: string;
                phoneNumberValue: string;
            },
        ] = await (
            await this.connectionManager.manager()
        ).query(
            `${EmployeeDao.selectEmployee} WHERE "EMPLOYEE"."EMPLOYEE_ID" = $1;`,
            [employeeNumber.value()],
        );
        if (result.length < 1) return;
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
        }> = await (await this.connectionManager.manager()).query(
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
        await (
            await this.connectionManager.manager()
        ).query(`INSERT INTO "EMPLOYEES" ("EMPLOYEE_ID") VALUES ($1);`, [
            employeeNumber.value(),
        ]);
    };

    deleteEmployeeName = async (
        employeeNumber: EmployeeNumber,
    ): Promise<void> => {
        await (
            await this.connectionManager.manager()
        ).query(`DELETE FROM "EMPLOYEE_NAMES" WHERE "EMPLOYEE_ID" = $1`, [
            employeeNumber.value(),
        ]);
    };

    insertEmployeeNameHistory = async (
        id: number,
        employeeNumber: EmployeeNumber,
        name: Name,
    ): Promise<void> => {
        await (await this.connectionManager.manager()).query(
            `
            INSERT INTO "EMPLOYEE_NAME_HISTORIES" ("EMPLOYEE_NAME_ID", "EMPLOYEE_ID", "EMPLOYEE_NAME")
            VALUES ($1, $2, $3);`,
            [id, employeeNumber.value(), name.toString()],
        );
    };

    insertEmployeeName = async (
        employeeNumber: EmployeeNumber,
        nameId: number,
        employeeName: Name,
    ): Promise<void> => {
        await (await this.connectionManager.manager()).query(
            `
            INSERT INTO "EMPLOYEE_NAMES" ("EMPLOYEE_ID", "EMPLOYEE_NAME_ID", "EMPLOYEE_NAME")
            VALUES ($1, $2, $3);`,
            [employeeNumber.value(), nameId, employeeName.toString()],
        );
    };

    deleteEmployeePhoneNumber = async (
        employeeNumber: EmployeeNumber,
    ): Promise<void> => {
        await (
            await this.connectionManager.manager()
        ).query(
            `DELETE FROM "EMPLOYEE_PHONE_NUMBERS" WHERE "EMPLOYEE_ID" = $1`,
            [employeeNumber.value()],
        );
    };

    insertEmployeePhoneNumberHistory = async (
        id: number,
        employeeNumber: EmployeeNumber,
        phoneNumber: PhoneNumber,
    ): Promise<void> => {
        await (await this.connectionManager.manager()).query(
            `INSERT INTO "EMPLOYEE_PHONE_NUMBER_HISTORIES" ("EMPLOYEE_PHONE_NUMBER_ID", "EMPLOYEE_ID", "PHONE_NUMBER")
            VALUES ($1, $2, $3);`,
            [id, employeeNumber.value(), phoneNumber.toString()],
        );
    };

    insertEmployeePhoneNumber = async (
        employeeNumber: EmployeeNumber,
        phoneId: number,
        phoneNumber: PhoneNumber,
    ): Promise<void> => {
        await (await this.connectionManager.manager()).query(
            `INSERT INTO "EMPLOYEE_PHONE_NUMBERS" ("EMPLOYEE_ID", "EMPLOYEE_PHONE_NUMBER_ID", "PHONE_NUMBER")
            VALUES ($1, $2, $3);`,
            [employeeNumber.value(), phoneId, phoneNumber.toString()],
        );
    };

    deleteEmployeeMailAddress = async (
        employeeNumber: EmployeeNumber,
    ): Promise<void> => {
        await (
            await this.connectionManager.manager()
        ).query(
            `DELETE FROM "EMPLOYEE_MAIL_ADDRESSES" WHERE "EMPLOYEE_ID" = $1`,
            [employeeNumber.value()],
        );
    };

    insertEmployeeMailAddressHistory = async (
        id: number,
        employeeNumber: EmployeeNumber,
        mailAddress: MailAddress,
    ): Promise<void> => {
        await (await this.connectionManager.manager()).query(
            `INSERT INTO "EMPLOYEE_MAIL_ADDRESS_HISTORIES" ("EMPLOYEE_MAIL_ADDRESS_ID", "EMPLOYEE_ID", "MAIL_ADDRESS")
            VALUES ($1, $2, $3);`,
            [id, employeeNumber.value(), mailAddress.toString()],
        );
    };

    insertEmployeeMailAddress = async (
        employeeNumber: EmployeeNumber,
        mailAddressId: number,
        mailAddress: MailAddress,
    ): Promise<void> => {
        await (await this.connectionManager.manager()).query(
            `
            INSERT INTO "EMPLOYEE_MAIL_ADDRESSES" ("EMPLOYEE_ID", "EMPLOYEE_MAIL_ADDRESS_ID", "MAIL_ADDRESS")
            VALUES ($1, $2, $3);`,
            [employeeNumber.value(), mailAddressId, mailAddress.toString()],
        );
    };

    insertInspireContract = async (
        employeeNumber: EmployeeNumber,
    ): Promise<void> => {
        await (await this.connectionManager.manager()).query(
            `
            INSERT INTO "INSPIRED_CONTRACTS" ("EMPLOYEE_ID")
            VALUES ($1);`,
            [employeeNumber.value()],
        );
    };

    deleteInspireContract = async (
        employeeNumber: EmployeeNumber,
    ): Promise<void> => {
        await (
            await this.connectionManager.manager()
        ).query(`DELETE FROM "INSPIRED_CONTRACT" WHERE "EMPLOYEE_ID" = $1`, [
            employeeNumber.value(),
        ]);
    };

    insertExpireContract = async (
        employeeNumber: EmployeeNumber,
    ): Promise<void> => {
        await (
            await this.connectionManager.manager()
        ).query(`DELETE FROM "EXPIRED_CONTRACT" WHERE "EMPLOYEE_ID" = $1`, [
            employeeNumber.value(),
        ]);
    };

    newEmployeeNumber = async (): Promise<number> => {
        const result: [{ nextval: string }] = await (
            await this.connectionManager.manager()
        ).query(`select nextval('"EMPLOYEE_ID"')`);
        const val = result[0].nextval;
        const num = Number.parseInt(val);
        return num;
    };

    newEmployeeNameIdentifier = async (): Promise<number> => {
        const result: [{ nextval: string }] = await (
            await this.connectionManager.manager()
        ).query(`select nextval('"EMPLOYEE_NAME_ID"')`);
        return Number.parseInt(result[0].nextval);
    };

    newEmployeePhoneNumberIdentifier = async (): Promise<number> => {
        const result: [{ nextval: string }] = await (
            await this.connectionManager.manager()
        ).query(`select nextval('"EMPLOYEE_PHONE_NUMBER_ID"')`);
        return Number.parseInt(result[0].nextval);
    };

    newEmployeeMailAddressIdentifier = async (): Promise<number> => {
        const result: [{ nextval: string }] = await (
            await this.connectionManager.manager()
        ).query(`select nextval('"EMPLOYEE_MAIL_ADDRESS_ID"')`);
        return Number.parseInt(result[0].nextval);
    };
}
