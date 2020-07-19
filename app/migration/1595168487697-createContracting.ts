import { MigrationInterface, QueryRunner } from 'typeorm';

export class createContracting1595168487697 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "INSPIRED_CONTRACTS" (
            "EMPLOYEE_ID"  INTEGER PRIMARY KEY,
            "CREATED_AT" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
                ,FOREIGN KEY ("EMPLOYEE_ID") REFERENCES "EMPLOYEES"("EMPLOYEE_ID")
            );
        `);
        await queryRunner.query(`
            CREATE TABLE "EXPIRED_CONTRACTS" (
            "EMPLOYEE_ID"  INTEGER PRIMARY KEY,
            "CREATED_AT" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
                ,FOREIGN KEY ("EMPLOYEE_ID") REFERENCES "EMPLOYEES"("EMPLOYEE_ID")
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
