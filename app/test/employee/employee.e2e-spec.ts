import 'reflect-metadata';
import * as request from 'supertest';
import { TestingModule, Test } from '@nestjs/testing';
import { EmployeeModule } from 'src/module/employee.module';
import { ValidationPipe, INestApplication } from '@nestjs/common';

describe('Employee', () => {
    let app: INestApplication;
    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [EmployeeModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe({ transform: true }));
        await app.init();
    });
    it('register', async () => {
        const res = await request(app.getHttpServer())
            .post('/employees')
            .send({
                name: 'tkt',
                mail_address: 'tktcorporation.go@gmail.com',
                phone_number: '090-1123-5600',
            })
            .expect(201);
        expect(res.body).toBeDefined();
        expect(res.body.employee_number).toBeGreaterThan(0);
    });
    it('bad request', async () => {
        const res = await request(app.getHttpServer())
            .post('/employees')
            .send({
                name: 'tkt',
                mail_address: 'tktcorporation.go@gmail.com',
                phone_number: '000-0000-0000',
            })
            .expect(400);
        expect(res.body).toBeDefined();
        expect(res.body.error).toBe('Bad Request');
    });
});
