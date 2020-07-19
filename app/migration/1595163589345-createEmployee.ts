import { MigrationInterface, QueryRunner } from 'typeorm';

export class createEmployee1595161973692 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "EMPLOYEES" (
                "EMPLOYEE_ID"  INTEGER PRIMARY KEY,
                "CREATED_AT" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            );
            CREATE SEQUENCE "EMPLOYEE_ID";
        `);
        await queryRunner.query(`
            CREATE TABLE "EMPLOYEE_NAME_HISTORIES" (
                "EMPLOYEE_NAME_ID" INTEGER PRIMARY KEY,
                "EMPLOYEE_ID"  INTEGER NOT NULL,
                "EMPLOYEE_NAME" VARCHAR(40) NOT NULL,
                "CREATED_AT" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
                    ,FOREIGN KEY ("EMPLOYEE_ID") REFERENCES "EMPLOYEES"("EMPLOYEE_ID")
            );
            CREATE SEQUENCE "EMPLOYEE_NAME_ID";
        `);
        await queryRunner.query(`
            CREATE TABLE "EMPLOYEE_NAMES" (
                "EMPLOYEE_ID"  INTEGER NOT NULL,
                "EMPLOYEE_NAME_ID" INTEGER NOT NULL,
                "EMPLOYEE_NAME" VARCHAR(40) NOT NULL,
                "CREATED_AT" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    PRIMARY KEY ("EMPLOYEE_ID")
                    ,FOREIGN KEY ("EMPLOYEE_ID") REFERENCES "EMPLOYEES"("EMPLOYEE_ID")
                    ,FOREIGN KEY ("EMPLOYEE_NAME_ID") REFERENCES "EMPLOYEE_NAME_HISTORIES"("EMPLOYEE_NAME_ID")
            );
        `);
        await queryRunner.query(`
            CREATE TABLE "EMPLOYEE_PHONE_NUMBER_HISTORIES" (
                "EMPLOYEE_PHONE_NUMBER_ID" INTEGER PRIMARY KEY,
                "EMPLOYEE_ID"  INTEGER NOT NULL,
                "PHONE_NUMBER" VARCHAR(13) NOT NULL,
                "CREATED_AT" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
                    ,FOREIGN KEY ("EMPLOYEE_ID") REFERENCES "EMPLOYEES"("EMPLOYEE_ID")
            );
            CREATE SEQUENCE "EMPLOYEE_PHONE_NUMBER_ID";
        `);
        await queryRunner.query(`
            CREATE TABLE "EMPLOYEE_PHONE_NUMBERS" (
            "EMPLOYEE_ID" INTEGER NOT NULL,
            "EMPLOYEE_PHONE_NUMBER_ID" INTEGER NOT NULL,
            "PHONE_NUMBER" VARCHAR(13) NOT NULL,
            "CREATED_AT" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY ("EMPLOYEE_ID")
                ,FOREIGN KEY ("EMPLOYEE_ID") REFERENCES "EMPLOYEES"("EMPLOYEE_ID")
                ,FOREIGN KEY ("EMPLOYEE_PHONE_NUMBER_ID") REFERENCES "EMPLOYEE_PHONE_NUMBER_HISTORIES"("EMPLOYEE_PHONE_NUMBER_ID")
            );
        `);
        await queryRunner.query(`
            CREATE TABLE "EMPLOYEE_MAIL_ADDRESS_HISTORIES" (
            "EMPLOYEE_MAIL_ADDRESS_ID" INTEGER PRIMARY KEY,
            "EMPLOYEE_ID"  INTEGER NOT NULL,
            "MAIL_ADDRESS" VARCHAR(255) NOT NULL,
            "CREATED_AT" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
                ,FOREIGN KEY ("EMPLOYEE_ID") REFERENCES "EMPLOYEES"("EMPLOYEE_ID")
            );
            CREATE SEQUENCE "EMPLOYEE_MAIL_ADDRESS_ID";
        `);
        await queryRunner.query(`
            CREATE TABLE "EMPLOYEE_MAIL_ADDRESSES" (
            "EMPLOYEE_ID"  INTEGER NOT NULL,
            "EMPLOYEE_MAIL_ADDRESS_ID" INTEGER NOT NULL,
            "MAIL_ADDRESS" VARCHAR(255) NOT NULL,
            "CREATED_AT" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY ("EMPLOYEE_ID")
                ,FOREIGN KEY ("EMPLOYEE_ID") REFERENCES "EMPLOYEES"("EMPLOYEE_ID")
                ,FOREIGN KEY ("EMPLOYEE_MAIL_ADDRESS_ID") REFERENCES "EMPLOYEE_MAIL_ADDRESS_HISTORIES"("EMPLOYEE_MAIL_ADDRESS_ID")
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "EMPLOYEES";
            DROP SEQUENCE "EMPLOYEE_ID";
            DROP TABLE "EMPLOYEE_NAME_HISTORIES";
            DROP SEQUENCE "EMPLOYEE_NAME_ID";
            DROP TABLE "EMPLOYEE_NAMES";
            DROP TABLE "EMPLOYEE_PHONE_NUMBER_HISTORIES";
            DROP SEQUENCE "EMPLOYEE_PHONE_NUMBER_ID";
            DROP TABLE "EMPLOYEE_PHONE_NUMBERS";
            DROP TABLE "EMPLOYEE_MAIL_ADDRESS_HISTORIES";
            DROP SEQUENCE "EMPLOYEE_MAIL_ADDRESS_ID";
            DROP TABLE "EMPLOYEE_MAIL_ADDRESSES";
        `);
    }
}
