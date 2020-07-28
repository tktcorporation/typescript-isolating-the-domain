import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger, INestApplication } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();

    const port = 3000;
    Logger.debug(`listen port ${port}`);
    await app.listen(port);
}
bootstrap();
