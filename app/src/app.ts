import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import { EmployeeController } from './presentation/employee/EmployeeController';

const app = createExpressServer({
    controllers: [EmployeeController],
});

app.listen(3000);
